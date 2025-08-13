import { Op } from "sequelize";
import {
  findSites,
  findCategories,
  findSiteById,
  createSite,
  updateSiteRecord,
  deleteSiteById,
  bulkDeleteSites,
  siteExistsWithUrl,
} from "../services/siteService.js";
import deleteFileIfExists from "../utils/fileUtils.js";

export const getSites = async (req, res) => {
  try {
    const { search, category, page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    let whereClause = {};
    if (search) {
      whereClause[Op.or] = [
        { title: { [Op.iLike]: `%${search}%` } },
        { siteUrl: { [Op.iLike]: `%${search}%` } },
        { description: { [Op.iLike]: `%${search}%` } },
      ];
    }
    if (category) whereClause.category = category;

    const { count, rows: sites } = await findSites(whereClause, limit, offset);

    res.json({
      sites,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(count / limit),
        totalItems: count,
        itemsPerPage: parseInt(limit),
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await findCategories();
    res.json(categories.map((c) => c.category));
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const addSite = async (req, res) => {
  try {
    const { siteUrl, title, coverImage, description, category } = req.body;

    if (await siteExistsWithUrl(siteUrl)) {
      return res
        .status(400)
        .json({ message: "Site with this URL already exists" });
    }

    const site = await createSite({
      siteUrl,
      title,
      coverImage,
      description,
      category,
    });
    res.status(201).json(site);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateSite = async (req, res) => {
  try {
    const { id } = req.params;
    const { siteUrl, title, coverImage, description, category } = req.body;

    const site = await findSiteById(id);
    if (!site) return res.status(404).json({ message: "Site not found" });

    if (siteUrl !== site.siteUrl && (await siteExistsWithUrl(siteUrl, id))) {
      return res
        .status(400)
        .json({ message: "Site with this URL already exists" });
    }

    if (coverImage && site.coverImage && coverImage !== site.coverImage) {
      deleteFileIfExists(
        site.coverImage.replace(`${process.env.NEXT_BACKEND_URL}/`, "./")
      );
    }

    await updateSiteRecord(site, {
      siteUrl,
      title,
      coverImage,
      description,
      category,
    });
    res.json(site);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteSite = async (req, res) => {
  try {
    const { id } = req.params;
    const site = await findSiteById(id);
    if (!site) return res.status(404).json({ message: "Site not found" });

    if (site.coverImage) {
      deleteFileIfExists(
        site.coverImage.replace(`${process.env.NEXT_BACKEND_URL}/`, "./")
      );
    }

    await deleteSiteById(id);
    res.json({ message: "Site deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const bulkDeleteSite = async (req, res) => {
  try {
    const { ids } = req.body;
    const sitesToDelete = await Promise.all(ids.map((id) => findSiteById(id)));

    sitesToDelete.forEach((site) => {
      if (site?.coverImage) {
        deleteFileIfExists(
          site.coverImage.replace(`${process.env.NEXT_BACKEND_URL}/`, "./")
        );
      }
    });

    const deletedCount = await bulkDeleteSites(ids);
    res.json({
      message: `${deletedCount} site(s) deleted successfully`,
      deletedCount,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
