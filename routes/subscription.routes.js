import { Router } from "express";

const subscriptionRouter = Router();

subscriptionRouter.get("/", (req, res) => {
  res.send({
    title: "GET all subscription",
  });
});
subscriptionRouter.post("/", (req, res) => {
  res.send({
    title: "CREATE subscription",
  });
});

subscriptionRouter.get("/upcoming-renewals", (req, res) => {
  res.send({
    title: "GET upcoming renewals",
  });
});

subscriptionRouter.get("/:id", (req, res) => {
  res.send({
    title: "GET subscription details",
  });
});
subscriptionRouter.patch("/:id", (req, res) => {
  res.send({
    title: "UPDATE subscription",
  });
});
subscriptionRouter.delete("/:id", (req, res) => {
  res.send({
    title: "DELETE subscription",
  });
});
subscriptionRouter.get("/user/:id", (req, res) => {
  res.send({
    title: "GET all user subscriptions",
  });
});
subscriptionRouter.put("/:id/cancel", (req, res) => {
  res.send({
    title: "CANCEL subscription",
  });
});
export { subscriptionRouter };
