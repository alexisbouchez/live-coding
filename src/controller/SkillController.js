const Skill = require("../entity/Skill");
const { dataSource } = require("../utils");

class SkillController {
  static async create(req, res) {
    try {
      await dataSource.getRepository(Skill).save(req.body);
    } catch (error) {
      if (error.code === "SQLITE_CONSTRAINT") {
        return res.status(409).send("Skill already exists");
      }
      return res.status(400).send("Something went wrong");
    }

    res.send("Create skill");
  }

  static async read(req, res) {
    const skills = await dataSource.getRepository(Skill).find();
    res.send(skills);
  }

  static async update(req, res) {
    const { id } = req.params;

    const existingSkill = await dataSource.getRepository(Skill).findOneBy({
      id,
    });
    if (existingSkill === null) {
      return res.status(404).send("Skill not found");
    }

    await dataSource.getRepository(Skill).update(id, req.body);
    res.send("Update skill");
  }

  static async delete(req, res) {
    const { id } = req.params;

    const existingSkill = await dataSource.getRepository(Skill).findOneBy({
      id,
    });
    if (existingSkill === null) {
      return res.status(404).send("Skill not found");
    }

    await dataSource.getRepository(Skill).delete(id);
    res.send("Deleted Skill");
  }
}

module.exports = SkillController;
