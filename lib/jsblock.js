/**
 * @module jsblock
 */
(function () {
    var root = this;
    var defaultOptions = {
        editable: true,
        consoleText: "Output from the example appears here",
        consoleClass: "jsblock-console-text",
        runButtonText: "run",
        runButtonClass: "jsblock-console-run",
        console: true,
        resetable: true,
        runnable: true,
        editorTheme: "ace/theme/dawn",
        lineNumbers: true
    };
    /**
     * The main function to be invoked to create the jsblock
     *
     * @param {Element} element
     * @param {Object} options
     *
     * @returns {undefined}
     */
    function jsblock(element, options) {
        this.element = element;
        this.originalElement = element.cloneNode(true);
        this.enabled = true;
        this.options = Object.assign({}, defaultOptions, options);
        this.init();
    }
    jsblock.prototype = {
        init: function () {
            var consoleWrapper = this.createConsoleWrapper();
            if (this.options.runnable) {
                consoleWrapper.append(this.createRunButton());
            }
            consoleWrapper.append(this.createResetButton());
            this.element.parentNode.insertBefore(consoleWrapper, this.element.nextSibling);
            this.setupEditor(this.element);
        },
        /**
         * Creates the consoleWrapper element
         *
         * @returns {HTMLElement}
         */
        createConsoleWrapper: function () {
            this.createConsole();
            var consoleWrapper = document.createElement('div');
            consoleWrapper.classList.add('jsblock-console');
            consoleWrapper.appendChild(this.console);
            return consoleWrapper;
        },
        /**
         * Creates the console element
         *
         * @returns {HTMLElement}
         */
        createConsole: function () {
            this.console = document.createElement('span');
            this.console.classList.add('jsblock-console-text');
            this.console.innerText = this.options.consoleText;
            this.console.classList.add("placeholder");
            this.console.offsetWidth = this.element.offsetWidth - 70;
            return this.console;
        },
        /**
         * Creates the runButton element
         *
         * @returns {HTMLElement}
         */
        createRunButton: function () {
            this.runButton = document.createElement('span');
            this.runButton.classList.add('jsblock-console-run');
            this.runButton.innerText = this.options.runButtonText;
            this.addRunButtonEvent();
            return this.runButton;
        },
        /**
         * Creates the resetButton element
         *
         * @returns {HTMLElement}
         */
        createResetButton: function () {
            this.resetButton = document.createElement('span');
            this.resetButton.classList.add('jsblock-console-reset');
            this.resetButton.innerText = 'Reset';
            this.addResetButtonEvent();
            return this.resetButton;
        },
        /**
         * Sets up Ace Editor
         *
         * @returns {undefined}
         */
        setupEditor: function () {
            this.element.style.height = this.element.offsetHeight + 'px';
            this.editor = window.ace.edit(this.element);
            /* Disables deprecation warning */
            this.editor.$blockScrolling = Infinity;
            this.editor.resize();
            this.editor.getSession().on('resize', function (e) {
                this.editor.resize();
            });
            this.editor.setTheme(this.options.editorTheme);
            this.editor.getSession().setUseWorker(false);
            this.editor.getSession().setMode("ace/mode/javascript");
            this.editor.setShowFoldWidgets(false);
            // Override commands: http://stackoverflow.com/questions/13677898/how-to-disable-ace-editors-find-dialog
            this.editor.commands.addCommands([{
                    name: "unfind",
                    bindKey: { win: "Ctrl-F", mac: "Command-F" },
                    exec: function (editor, line) { return false; },
                    readOnly: true
                }, {
                    name: "unreplace",
                    bindKey: { win: "Ctrl-R", mac: "Command-R" },
                    exec: function (editor, line) { return false; },
                    readOnly: true
                }]);
            this.editor.setReadOnly(!this.options.editable);
            this.editor.renderer.setShowGutter(this.options.lineNumbers);
        },
        /**
         * Sets up events for the run element
         *
         * @returns {undefined}
         */
        addRunButtonEvent: function () {
            var self = this;
            this.runButton.addEventListener('click', function () {
                if (self.enabled) {
                    var editorValue_1 = self.editor.getValue();
                    self.console.innerText = '';
                    self.console.classList.remove("placeholder");
                    (function () {
                        var c = {};
                        c.log = function () {
                            var arr = [];
                            for (var i = 0; i < arguments.length; i++) {
                                arr.push(arguments[i]);
                            }
                            var text = arr.join(" ");
                            var currText = self.console.innerHTML;
                            currText += text + "<br/>";
                            self.console.innerHTML = currText;
                        };
                        try {
                            // NOTE: This cannot be minified
                            (function (console) {
                                eval(editorValue_1);
                            })(c);
                        }
                        catch (err) {
                            c.log("Error:", err);
                        }
                    })();
                }
            });
        },
        /**
         * Sets up events for the run element
         *
         * @returns {undefined}
         */
        addResetButtonEvent: function () {
            var self = this;
            this.resetButton.addEventListener('click', function () {
                self.editor.setValue(self.originalElement.innerText);
                self.editor.clearSelection();
                self.editor.navigateFileStart();
                self.console.innerText = self.options.consoleText;
                self.console.classList.add('placeholder');
                return false;
            });
        },
        /**
         * Removes listeners and removes the editor
         *
         * @returns {undefined}
         */
        destroy: function () {
            this.editor.destroy();
            this.editor = null;
            this.options = null;
            this.originalText = null;
            this.console = null;
            this.runButton = this;
            this.resetButton = null;
            this.element.parentNode.insertBefore(this.originalElement, this.element.nextSibling);
            this.element.remove();
        }
    };
    root.jsblock = jsblock;
})();
