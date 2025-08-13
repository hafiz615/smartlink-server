import { Op } from "sequelize";
import Site from "../models/Site.js";

export const findSites = async (whereClause, limit, offset) => {
  return Site.findAndCountAll({
    where: whereClause,
    order: [["createdAt", "DESC"]],
    limit,
    offset,
    raw: false,
  });
};

export const findCategories = async () => {
  return Site.findAll({
    attributes: ["category"],
    group: ["category"],
    order: [["category", "ASC"]],
  });
};

export const findSiteById = (id) => Site.findByPk(id);

export const createSite = (data) => Site.create(data);

export const updateSiteRecord = (site, data) => site.update(data);

export const deleteSiteById = (id) => Site.destroy({ where: { id } });

export const bulkDeleteSites = (ids) =>
  Site.destroy({ where: { id: { [Op.in]: ids } } });

export const siteExistsWithUrl = (siteUrl, excludeId = null) => {
  const where = excludeId
    ? { siteUrl, id: { [Op.ne]: excludeId } }
    : { siteUrl };
  return Site.findOne({ where });
};
