const chai = require("chai");
const chaiHttp = require("chai-http");
const apiRoutes = require("../routes/API/apiRoutes");
const express = require("express");
const app = express();

//Express Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/api", apiRoutes);

chai.use(chaiHttp);
chai.should();

describe("GET /", () => {
  // Test for /api/ping server status
  it("ping API and return status 200 and success true", (done) => {
    chai
      .request(app)
      .get("/api/ping")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        done();
      });
  });

  // Test for /api/posts if tags parameter not present
  it("Return status 400 and Response body error", (done) => {
    chai
      .request(app)
      .get("/api/posts?sortBy=likes")
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a("object");
        res.body.should.include({ error: "Tags parameter is required" });
        done();
      });
  });

  // Test for /api/posts if sortBy parameter not equal to id, reads, likes, popularity
  it("Return status 400 and Response body error", (done) => {
    chai
      .request(app)
      .get("/api/posts?tags=history,tech&sortBy=liasdfkes")
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a("object");
        res.body.should.include({ error: "sortBy parameter is invalid" });
        done();
      });
  });

  // Test for /api/posts if sortBy parameter not equal to id, reads, likes, popularity
  it("Return status 400 and Response body error", (done) => {
    chai
      .request(app)
      .get("/api/posts?tags=history,tech&sortBy=liasdfkes")
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a("object");
        res.body.should.include({ error: "sortBy parameter is invalid" });
        done();
      });
  });
});
