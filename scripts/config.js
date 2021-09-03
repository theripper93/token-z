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
    this.zIndex = this.data.elevation || 0;
}