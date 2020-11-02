import { describe} from "mocha";
import logout from './user/logout.spec';

// USER LOGOUT TEST SUIT

describe("Logout test suit", () => {
    describe("POST user/logout logging out user", logout);
  });