/**
 * Options Controller
 * Binds UI elements securely to the legacy shellaccesslayer and gameclient libraries.
 */
CCApp.controller('OptionsController', function($scope) {
    
    $scope.optionsTab = 'GRAPHICS';

    $scope.setOptionsTab = function(tabName) {
        $scope.optionsTab = tabName;
    };

    // Default configuration bounds
    $scope.settings = {
        shellMode: 'fullscreen',
        gameMode: 'fullscreen',
        volume: 30
    };

    // ==========================================
    // API EXECUTION BINDINGS
    // ==========================================
    
    $scope.applyShellMode = function() {
        if ($scope.settings.shellMode === 'fullscreen') {
            if (typeof window.FrontEndFullscreenTrue !== 'undefined') window.FrontEndFullscreenTrue();
        } else {
            if (typeof window.FrontEndFullscreenFalse !== 'undefined') window.FrontEndFullscreenFalse();
        }
    };

    $scope.applyGameMode = function() {
        if ($scope.settings.gameMode === 'fullscreen') {
            if (typeof window.GameFullscreen !== 'undefined') window.GameFullscreen();
        } else {
            // Adapted custom payload as shell.js only natively bound GameFullscreen(true)
            if (typeof window.shellaccesslayer !== 'undefined') {
                window.shellaccesslayer.execute({
                    _resource: "/usersettings/apply",
                    gamefullscreen: false
                });
            }
        }
    };

    $scope.applyResolution = function() {
        if ($scope.settings.shellMode === 'fullscreen') {
            if (typeof window.SetFullscreenDimensions !== 'undefined') window.SetFullscreenDimensions();
        } else {
            if (typeof window.SetWindowedDimensions !== 'undefined') window.SetWindowedDimensions();
        }
    };

    $scope.applyVolume = function() {
        // Calls the native shell.js function which dynamically manipulates the #volumeValue element
        if (typeof window.updateVolume !== 'undefined') {
            window.updateVolume($scope.settings.volume);
        }
    };

    // ==========================================
    // DIALOG ACTION BUTTONS
    // ==========================================
    
    $scope.actionQuit = function() {
        if (typeof window.quitClient !== 'undefined') window.quitClient();
        $scope.closeOptions(); // Inherited downward from RootController
    };

    $scope.actionSave = function() {
        if (typeof window.save !== 'undefined') window.save();
        $scope.closeOptions();
    };

    $scope.actionDiscard = function() {
        if (typeof window.discard !== 'undefined') window.discard();
        $scope.closeOptions();
    };
});