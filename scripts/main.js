Object.defineProperty(TokenDocument.prototype, "sort" , {
  get: function(){
    if(!(this instanceof TokenDocument)) return 0;
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

hoveredTarget = null;

function getBack() {
  const tokens = canvas.tokens.objects.children;
  return Math.min(-2000, ((tokens.length > 0) ? tokens[0].document.sort : -2000));
}

async function pushTokenBackListener(event) {
  if (event.isComposing) return;

  if (hoveredTarget && (event.key == 'z') && !event.altKey && !event.ctrlKey && !event.metaKey && !event.shiftKey && !event.repeat) {
    const back = getBack() - (hoveredTarget.controlled ? 2 : 1);
    await hoveredTarget.document.setFlag("token-z", "zIndex", back);
    canvas.tokens.objects.sortDirty = canvas.primary.sortDirty = true;
  }
}

Hooks.on("hoverToken", (token, hoverOn) => {
  if (hoverOn) {
    hoveredTarget = token;
    window.addEventListener('keydown', pushTokenBackListener);
  } else {
    window.removeEventListener('keydown', pushTokenBackListener);
    hoveredTarget = null;
  }
});

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
