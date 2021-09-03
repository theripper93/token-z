Hooks.once('init', async function() {

});

Hooks.once('ready', async function() {

    libWrapper.register(
        "token-z",
        "Token.prototype.refresh",
        tokenZRefresh,
        "WRAPPER"
      );

});


function tokenZRefresh(wrapped,...args) {
    wrapped(...args);
    this.zIndex = 2 + this.data.elevation*10 -this.data.width - this.data.height + this._controlled + this.data.flags["token-z"]?.zIndex || 0;
}

Hooks.on("renderTokenConfig", (app, html, data) => {
    let zIndex = app.object.getFlag("token-z", "zIndex") || 0;
  
    let newHtml = `
  <div class="form-group">
              <label>${game.i18n.localize(
                "Z-Index"
              )}</label>
              <input type="number" name="flags.token-z.zIndex" placeholder="units" value="${zIndex}">
          </div>
  `;
    const overh = html.find('input[name="elevation"]');
    const formGroup = overh.closest(".form-group");
    formGroup.after(newHtml);
    app.setPosition({ height: "auto" });
  });