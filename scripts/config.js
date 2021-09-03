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