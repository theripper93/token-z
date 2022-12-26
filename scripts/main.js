Object.defineProperty(TokenDocument.prototype, "sort" , {
  get: function(){
    if(!(this instanceof TokenDocument)) return 0;

    const zIndexOverride = this["token-z"]?.zIndexOverride;
    if(typeof zIndexOverride === "number") return zIndexOverride;

    const flag = this.flags["token-z"]?.zIndex ?? 0;
    const controlled = this._object?.controlled ? 1 : 0;
    const defeated = this.actor?.effects?.find(e => e.getFlag("core", "statusId") === CONFIG.specialStatusEffects.DEFEATED) ? -1000 : 0;
    return 2 - this.width - this.height + controlled + flag + defeated;
  },
  set: function (value) {}
})

Hooks.on("controlToken", (token, controlled) => {
  if(controlled) token.mesh.zIndex += 1;
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

//Pushback

Hooks.once("setup", () => {
  game.keybindings.register("token-z", "send-to-back-key", {
    name: "tokenz.send-to-back.name",
    hint: "tokenz.send-to-back.hint",
    editable: [{ key: 'KeyZ' }],
    restricted: false,
    onDown: pushTokenBack
  });
  
  function pushTokenBack(event) {
    const hoveredToken = canvas.tokens.hover;
    if (hoveredToken && !event.repeat) {
      const localStorage = (hoveredToken.document["token-z"] ??= {});
      localStorage.zIndexOverride = Math.min(-2000, ...canvas.tokens.placeables.map(t => t.document.sort)) - 1;
      hoveredToken.mesh.zIndex = localStorage.zIndexOverride;
    }
  }
});