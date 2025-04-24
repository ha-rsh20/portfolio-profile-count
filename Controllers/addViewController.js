const view = require("../Schemas/viewCount");
const expressAsyncHandler = require("express-async-handler");

const addView = expressAsyncHandler(async (req, res) => {
  const rawIp =
    req.headers["x-forwarded-for"]?.split(",")[0] ||
    req.socket?.remoteAddress ||
    req.connection?.remoteAddress ||
    req.ip;

  const ip = rawIp.includes("::ffff:") ? rawIp.split("::ffff:")[1] : rawIp;

  let totalViewCount = [];
  //condition 1: updating total count
  await view
    .findOne({ id: 0 })
    .then((data) => {
      totalViewCount = data;
    })
    .catch((err) => {
      console.log(err);
    });
  //if database is newly created there will be 0 documents then we need to add first document(total count)
  if (!totalViewCount) {
    let newTotalViewCount = new view({
      id: 0,
      description: "Total View Count",
      totalCount: 1,
    });
    newTotalViewCount
      .save()
      .then(() => {
        console.log("Total count added");
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    await view
      .updateOne({ id: 0 }, { totalCount: totalViewCount.totalCount + 1 })
      .then(() => {
        console.log("Total: New count!");
      })
      .catch((err) => console.log(err));
  }

  //Condition 2: need to add ip based count
  let ipViewCountAll = [];
  let ipViewCount = [];
  await view
    .find()
    .then((data) => {
      ipViewCountAll = data;
    })
    .catch((err) => {
      console.log(err);
    });

  await view
    .findOne({ ip: ip })
    .then((data) => {
      ipViewCount = data;
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });

  if (!ipViewCount) {
    console.log("Adding ip count!");
    let newIpViewCount = new view({
      id: ipViewCountAll[ipViewCountAll.length - 1].id + 1,
      ip: ip,
      viewCount: 1,
    });
    newIpViewCount
      .save()
      .then(() => {
        console.log("Ip: New Ip count added");
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    console.log("Updating ip count!");
    await view
      .updateOne({ ip: ip }, { viewCount: ipViewCount.viewCount + 1 })
      .then(() => {
        console.log("Ip: New count!");
      })
      .catch((err) => console.log(err));
  }

  console.log(ip);
  res.sendStatus(203);
});

module.exports = { addView };
