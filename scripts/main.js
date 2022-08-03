Object.defineProperty(TokenDocument.prototype, "sort" , {
  get: () => {
    const flag = this.flags["token-z"]?.zIndex ?? 0;
    const controlled = this.object?.controlled ? 1 : 0;
    const defeated = this.actor?.effects?.find(e => e.getFlag("core", "statusId") === CONFIG.specialStatusEffects.DEFEATED) ? -1000 : 0;
    return 2 - this.width - this.height + controlled + flag + defeated;
  }
})

Hooks.on("renderTokenConfig", (app, html, data) => {
  let zIndex = app.token.getFlag("token-z", "zIndex") || 0;

  let newHtml = `
  <div class="form-group">
              <label>${game.i18n.localize("tokenz.tokenconfig.zindex")}</label>
              <input type="number" name="flags.token-z.zIndex" placeholder="units" value="${zIndex}">
          </div>
  `;
  html.find('input[name="rotation"]').closest(".form-group").after(newHtml);
  app.setPosition({height: "auto"});
});