const router = require("express").Router();
const { getAdvisory, getCropStages, getPestAlerts } = require("../controllers/advisory.controller");

router.get("/", getAdvisory);
router.get("/stages/:crop", getCropStages);
router.get("/pests/:crop", getPestAlerts);

module.exports = router;
