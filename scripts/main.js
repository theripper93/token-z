Hooks.on("canvasReady", () => {
  canvas.tokens.sortableChildren = true;
});

Hooks.once("init", async function () {
  function tokenZRefresh(wrapped, ...args) {
    wrapped(...args);
    const flag = this.data.flags["token-z"]?.zIndex ?? 0;
    const controlled = this._controlled ? 1 : 0;
    this.zIndex = 2 + this.data.elevation * 10 - this.data.width - this.data.height + controlled + flag;
  }
  libWrapper.register("token-z","Token.prototype.refresh",tokenZRefresh,"WRAPPER");
});

Hooks.on("renderTokenConfig", (app, html, data) => {
  let zIndex = app.token.getFlag("token-z", "zIndex") || 0;

  let newHtml = `
  <div class="form-group">
              <label>${game.i18n.localize("tokenz.tokenconfig.zindex")}</label>
              <input type="number" name="flags.token-z.zIndex" placeholder="units" value="${zIndex}">
          </div>
  `;
  html.find('input[name="elevation"]').closest(".form-group").after(newHtml);
});