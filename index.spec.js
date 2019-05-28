const proxyquire = require("proxyquire");
const sandbox = require("sinon").createSandbox();

describe("index", () => {
  let index;
  let rollbar;
  let errorSpy;
  beforeEach(() => {
    errorSpy = sandbox.spy();
    rollbar = sandbox.stub().returns({ error: errorSpy });
    index = proxyquire("./index", {
      rollbar
    });
  });

  afterEach(() => sandbox.restore());

  it("should return a function", () => {
    const res = index({});
    res.should.be.a.Function();
  });

  it("should init rollbar with ROLLBAR_ACCESS_TOKEN", () => {
    process.env.ROLLBAR_ACCESS_TOKEN = "abc";
    index({});

    sandbox.assert.calledOnce(rollbar);
    sandbox.assert.calledWith(rollbar, {
      verbose: true,
      captureUncaught: true,
      captureUnhandledRejections: true,
      accessToken: "abc"
    });
  });

  describe("return function", () => {
    it("should call rollbar.error", () => {
      const res = index({});
      const next = sandbox.spy();
      res({ error: true }, {}, {}, next);

      sandbox.assert.calledOnce(errorSpy);
      sandbox.assert.calledWith(errorSpy, { error: true });
    });

    it("should call next", () => {
      const res = index({});
      const next = sandbox.spy();
      res({ error: true }, {}, {}, next);

      sandbox.assert.calledOnce(next);
      sandbox.assert.calledWith(next, { error: true });
    });
  });
});
