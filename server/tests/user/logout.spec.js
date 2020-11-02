import chai from "chai";
import chaiHttp from "chai-http";
import User from '../assets/user'
import server from "../../index";

const { expect } = chai;
chai.use(chaiHttp);

const logout = () => {
      it("should login before logout", (done) => {
          chai
          .request(server)
          .post("/user/logout")
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(401);
            done();
          });
      });
      it("should be able to logout", (done) => {
          chai
          .request(server)
          .post("/user/logout")
          .set(User.validToken)
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            done();
          });
      });
      it("should not logout if is already logout", (done) => {
          chai
          .request(server)
          .post("/user/logout")
          .set(User.validToken)
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(401);
            done(err);
          });
      });
      it("should not logout if user doesn't exists", (done) => {
        chai.request(server)
          .post('/user/logout')
          .set(User.noTokenProvided)
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(401);
            done(err);
          });
      });
};

export default logout;
