const Main = imports.ui.main;
const Util = imports.misc.util;
const Lang = imports.lang;

function init() {
    this.systemMenu = Main.panel.statusArea['aggregateMenu']._system;
}

function enable() {
    this._createActions();
    this._removeDefaultButton();
    this._addButtons();
}

function disable() {
    this._destroyActions();
    this._restoreDefaultButton();
}

function _removeDefaultButton() {
    this.systemMenu._actionsItem.actor.remove_child(
        this.systemMenu._altSwitcher.actor);
}

function _restoreDefaultButton() {
    this.systemMenu._actionsItem.actor.add(
        this.systemMenu._altSwitcher.actor, { expand: true, x_fill: false });
}

function _addButtons() {
    this.systemMenu._actionsItem.actor.add(
        this._altRebootAction, { expand: true, x_fill: false });
    this.systemMenu._actionsItem.actor.add(
        this._altpowerOffAction, { expand: true, x_fill: false });
}

function _createActions() {
    this._altRebootAction = this.systemMenu._createActionButton(
        'view-refresh-symbolic', "Restart");
    this._altRebootActionID = this._altRebootAction.connect(
        'clicked', Lang.bind(this, this._onRestartClicked));

    this._altpowerOffAction = this.systemMenu._createActionButton(
        'system-shutdown-symbolic', "Shutdown");
    this._altpowerOffActionId = this._altpowerOffAction.connect(
        'clicked', Lang.bind(this, this._onPowerOffClicked));
}

function _destroyActions() {
    if (this._altRebootActionId) {
        this._altRebootAction.disconnect(this._altRebootActionId);
        this._altRebootActionId = 0;
    }

    if (this._altpowerOffActionId) {
        this._altpowerOffAction.disconnect(this._altpowerOffActionId);
        this._altpowerOffActionId = 0;
    }

    if (this._altRebootAction) {
        this._altRebootAction.destroy();
        this._altRebootAction = 0;
    }

    if (this._altpowerOffAction) {
        this._altpowerOffAction.destroy();
        this._altpowerOffAction = 0;
    }
}

function _onPowerOffClicked() {
    Util.spawnCommandLine("poweroff");
}

function _onRestartClicked() {
    Util.spawnCommandLine("reboot");
}
