var Moon = (function (window, document) {
    'use strict';

    /**
     * VARIABLES
     */

    let LIBRARYNAME = 'Moon';
    let THEMES = [{
            name: 'success',
            icon: '<img src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjI0cHgiIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAwIDUxMCA1MTAiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMCA1MTA7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPGc+Cgk8ZyBpZD0iY2hlY2stY2lyY2xlLW91dGxpbmUiPgoJCTxwYXRoIGQ9Ik0xNTAuNDUsMjA2LjU1bC0zNS43LDM1LjdMMjI5LjUsMzU3bDI1NS0yNTVsLTM1LjctMzUuN0wyMjkuNSwyODUuNkwxNTAuNDUsMjA2LjU1eiBNNDU5LDI1NWMwLDExMi4yLTkxLjgsMjA0LTIwNCwyMDQgICAgUzUxLDM2Ny4yLDUxLDI1NVMxNDIuOCw1MSwyNTUsNTFjMjAuNCwwLDM4LjI1LDIuNTUsNTYuMSw3LjY1bDQwLjgwMS00MC44QzMyMS4zLDcuNjUsMjg4LjE1LDAsMjU1LDBDMTE0Ljc1LDAsMCwxMTQuNzUsMCwyNTUgICAgczExNC43NSwyNTUsMjU1LDI1NXMyNTUtMTE0Ljc1LDI1NS0yNTVINDU5eiIgZmlsbD0iI0ZGRkZGRiIvPgoJPC9nPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=" />'
        },
        {
            name: 'info',
            icon: '<img src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTguMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDMzMCAzMzAiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDMzMCAzMzA7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iMjRweCIgaGVpZ2h0PSIyNHB4Ij4KPGc+Cgk8cGF0aCBkPSJNMTY1LDBDNzQuMDE5LDAsMCw3NC4wMiwwLDE2NS4wMDFDMCwyNTUuOTgyLDc0LjAxOSwzMzAsMTY1LDMzMHMxNjUtNzQuMDE4LDE2NS0xNjQuOTk5QzMzMCw3NC4wMiwyNTUuOTgxLDAsMTY1LDB6ICAgIE0xNjUsMzAwYy03NC40NCwwLTEzNS02MC41Ni0xMzUtMTM0Ljk5OUMzMCw5MC41NjIsOTAuNTYsMzAsMTY1LDMwczEzNSw2MC41NjIsMTM1LDEzNS4wMDFDMzAwLDIzOS40NCwyMzkuNDM5LDMwMCwxNjUsMzAweiIgZmlsbD0iI0ZGRkZGRiIvPgoJPHBhdGggZD0iTTE2NC45OTgsNzBjLTExLjAyNiwwLTE5Ljk5Niw4Ljk3Ni0xOS45OTYsMjAuMDA5YzAsMTEuMDIzLDguOTcsMTkuOTkxLDE5Ljk5NiwxOS45OTEgICBjMTEuMDI2LDAsMTkuOTk2LTguOTY4LDE5Ljk5Ni0xOS45OTFDMTg0Ljk5NCw3OC45NzYsMTc2LjAyNCw3MCwxNjQuOTk4LDcweiIgZmlsbD0iI0ZGRkZGRiIvPgoJPHBhdGggZD0iTTE2NSwxNDBjLTguMjg0LDAtMTUsNi43MTYtMTUsMTV2OTBjMCw4LjI4NCw2LjcxNiwxNSwxNSwxNWM4LjI4NCwwLDE1LTYuNzE2LDE1LTE1di05MEMxODAsMTQ2LjcxNiwxNzMuMjg0LDE0MCwxNjUsMTQweiAgICIgZmlsbD0iI0ZGRkZGRiIvPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=" />'
        },
        {
            name: 'wrong',
            icon: '<img src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMS4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDQ5MS44NTggNDkxLjg1OCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDkxLjg1OCA0OTEuODU4OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjI0cHgiIGhlaWdodD0iMjRweCI+CjxnPgoJPGc+CgkJPHBhdGggZD0iTTI0NS45MjksMEMxMTAuMTA2LDAsMCwxMTAuMTA2LDAsMjQ1LjkyOXMxMTAuMTA2LDI0NS45MjksMjQ1LjkyOSwyNDUuOTI5YzEzNS44MjIsMCwyNDUuOTI5LTExMC4xMDYsMjQ1LjkyOS0yNDUuOTI5ICAgIFMzODEuNzUxLDAsMjQ1LjkyOSwweiBNNDMuNzIxLDI0NS45MjljMC0xMTEuNjc3LDkwLjUzMS0yMDIuMjA4LDIwMi4yMDgtMjAyLjIwOGM0Ni4xNDQsMCw4OC42NjgsMTUuNDY3LDEyMi42OTYsNDEuNDg1ICAgIEw4NS4yMDQsMzY4LjYyNUM1OS4xODcsMzM0LjU5Nyw0My43MjEsMjkyLjA3Miw0My43MjEsMjQ1LjkyOXogTTI0NS45MjksNDQ4LjEzN2MtNDUuODI4LDAtODguMDg3LTE1LjI1NS0xMjItNDAuOTUgICAgTDQwNy4xODYsMTIzLjkzYzI1LjY5NCwzMy45MTEsNDAuOTQ5LDc2LjE3MSw0MC45NDksMTIxLjk5OUM0NDguMTM2LDM1Ny42MDUsMzU3LjYwNSw0NDguMTM3LDI0NS45MjksNDQ4LjEzN3oiIGZpbGw9IiNGRkZGRkYiLz4KCTwvZz4KCTxnPgoJPC9nPgoJPGc+Cgk8L2c+Cgk8Zz4KCTwvZz4KCTxnPgoJPC9nPgoJPGc+Cgk8L2c+Cgk8Zz4KCTwvZz4KCTxnPgoJPC9nPgoJPGc+Cgk8L2c+Cgk8Zz4KCTwvZz4KCTxnPgoJPC9nPgoJPGc+Cgk8L2c+Cgk8Zz4KCTwvZz4KCTxnPgoJPC9nPgoJPGc+Cgk8L2c+Cgk8Zz4KCTwvZz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K" />'
        },
        {
            name: 'warning',
            icon: '<img src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDUxMS45OTkgNTExLjk5OSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTExLjk5OSA1MTEuOTk5OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjI0cHgiIGhlaWdodD0iMjRweCI+CjxnPgoJPGc+CgkJPGc+CgkJCTxwYXRoIGQ9Ik01MDYuMTc1LDM2NS41NzZjLTQuMDk1LTEwLjI1OC0xNS43MjktMTUuMjU1LTI1Ljk4Ny0xMS4xNmMtMTAuMjU4LDQuMDk1LTE1LjI1NSwxNS43MjktMTEuMTYsMjUuOTg3ICAgICBjNS4yMDYsMTMuMDQzLDMuNDk5LDI3LjkzNS00LjU2NywzOS44MzljLTguMDcsMTEuOTEtMjAuOTkxLDE4Ljc0MS0zNS40NDksMTguNzQxSDgzLjA2OGMtMTUuNzcxLDAtMjkuNzc2LTguMjI5LTM3LjQ2NS0yMi4wMTUgICAgIGMtNy43MDEtMTMuODA5LTcuMzM5LTMwLjA4MiwwLjk2OC00My41MzNMMjE5LjU0Myw5My4zODJjNy44NzYtMTIuNzUyLDIxLjUxOS0yMC4zNjUsMzYuNDk3LTIwLjM2NSAgICAgYzE0Ljk3OCwwLDI4LjYyLDcuNjEzLDM2LjQ5NywyMC4zNjVsMTI3LjkyNywyMDcuMTI0YzUuODA0LDkuMzk3LDE4LjEyOCwxMi4zMTIsMjcuNTIzLDYuNTA1ICAgICBjOS4zOTYtNS44MDMsMTIuMzEtMTguMTI2LDYuNTA1LTI3LjUyM0wzMjYuNTY0LDcyLjM2NGMtMTUuMjE2LTI0LjYzNi00MS41OC0zOS4zNDQtNzAuNTI1LTM5LjM0NHMtNTUuMzA5LDE0LjcwOS03MC41MjUsMzkuMzQ0ICAgICBMMTIuNTQyLDM1Mi40MThjLTE2LjAzNiwyNS45NjYtMTYuNzM0LDU3LjM4LTEuODY5LDg0LjAzM2MxNC44NTMsMjYuNjMsNDEuOTE2LDQyLjUyOCw3Mi4zOTUsNDIuNTI4aDM0NS45NDQgICAgIGMyNy45MzgsMCw1Mi45MjctMTMuMjMzLDY4LjU2LTM2LjMwM0M1MTMuMDg4LDQxOS43NzgsNTE2LjMwMywzOTAuOTU1LDUwNi4xNzUsMzY1LjU3NnoiIGZpbGw9IiNGRkZGRkYiLz4KCQkJPHBhdGggZD0iTTI1Ni4wNDksMzk5Ljk4N2MxMS4wNDUsMCwxOS45OTgtOC45NTMsMTkuOTk4LTE5Ljk5OGMwLTExLjA0NS04Ljk1My0xOS45OTgtMTkuOTk4LTE5Ljk5OGgtMC4wMSAgICAgYy0xMS4wNDUsMC0xOS45OTMsOC45NTMtMTkuOTkzLDE5Ljk5OEMyMzYuMDQ2LDM5MS4wMzQsMjQ1LjAwNCwzOTkuOTg3LDI1Ni4wNDksMzk5Ljk4N3oiIGZpbGw9IiNGRkZGRkYiLz4KCQkJPHBhdGggZD0iTTI3Ni4wMzgsMzA5Ljk5NVYxNjMuMDA4YzAtMTEuMDQ1LTguOTUzLTE5Ljk5OC0xOS45OTgtMTkuOTk4Yy0xMS4wNDUsMC0xOS45OTgsOC45NTMtMTkuOTk4LDE5Ljk5OHYxNDYuOTg3ICAgICBjMCwxMS4wNDUsOC45NTMsMTkuOTk4LDE5Ljk5OCwxOS45OThDMjY3LjA4NSwzMjkuOTkzLDI3Ni4wMzgsMzIxLjA0LDI3Ni4wMzgsMzA5Ljk5NXoiIGZpbGw9IiNGRkZGRkYiLz4KCQk8L2c+Cgk8L2c+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg==" />'
        },
        {
            name: 'moon-dark',
            icon: ''
        },
        {
            name: 'moon-light',
            icon: ''
        }
    ];
    let POSITIONS = ['top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right'];
    let DEFAULTS = {
        id: '',
        title: '',
        titleColor: 'white',
        titleSize: '14px',
        titleClass: '',
        text: '',
        textColor: 'white',
        textSize: '13px',
        textClass: '',
        bodyStyle: {
            background: '',
            border: '',
            borderRadius: '',
            boxShadow: '',
            hoverClasses: '',
            progressBarColor: '',
            progressBarRadius: ''
        },
        theme: 'moon-dark',
        position: 'top-right',
        timeout: 5000,
        progressBar: true,
        pauseOnHover: false,
        resetOnHover: false,
        buttonClose: false,
        clickToClose: true,
        preventDuplicates: false,
        newestOnTop: false,
        animation: {
            open: {
                duration: '1000',
                name: 'fade-in'
            },
            close: {
                duration: '1000',
                name: 'fade-out'
            }
        },
        kill: false,
        events: {
            onHover: function () {},
            onOpened: function () {},
            onClosed: function () {},
            onClick: function () {}
        }
    }
    let Moon = {};
    Moon.childrens = {};

    /**
     * METODOS PRIVADOS
     */
    let extend = function (defaults, options) {
        let extended = {};
        for (let prop in defaults) {
            extended[prop] = defaults[prop];
        }
        for (let prop in options) {
            extended[prop] = options[prop];
        }
        return extended;
    }

    let createTemplate = function (configObtions) {
        let html = `<div class="${LIBRARYNAME}-container" style="width: 320px;">
                        <div class="${LIBRARYNAME}-icon">

                        </div>
                        <div class="${LIBRARYNAME}-title">
                            <p class="${configObtions.titleClass}" style="color: ${configObtions.titleColor};font-size: ${configObtions.titleSize}">
                                ${configObtions.title}
                            </p>
                        </div>
                        <div class="${LIBRARYNAME}-body">
                        <p class="${configObtions.textClass}" style="color: ${configObtions.textColor};font-size: ${configObtions.textSize}">
                                ${configObtions.text}
                            </p>
                        </div>
                    </div>`;
        let div = document.createElement('div');
        div.innerHTML = html;

        return div;
    }

    let generateID = function (str) {
        return LIBRARYNAME + '-' + window.btoa(unescape(encodeURIComponent(str)));
    }

    let progressBar = function (moonAlert, config) {
        if (config.timeout && config.progressBar) {
            let element = document.createElement('div');
            element.classList.add(LIBRARYNAME + '-progressbar');
            moonAlert.appendChild(element);
        }
    }

    let remove = function (moonAlert, config, callback) {
        if (config.time.timer) {
            clearInterval(config.time.timer);
        }
        animation(moonAlert, config, false, function () {
            delete Moon.childrens[config.id];
            moonAlert.remove();
            if (typeof callback === 'function') {
                callback();
            }
            if (config.events.onClosed) {
                let event = new CustomEvent('closed', {
                    detail: config,
                    bubbles: true,
                    cancelable: true
                });
                moonAlert.dispatchEvent(event);
            }
        });
    }

    let preventDuplicates = function (preventDuplicates, str, callback) {
        if (preventDuplicates) {
            let decode = LIBRARYNAME + '-' + window.btoa(unescape(encodeURIComponent(str)));

            if (Moon.childrens) {
                for (let i in Moon.childrens) {
                    let index = Moon.childrens[i]['id'].indexOf('@');
                    let restOfString = Moon.childrens[i]['id'].substr(0, index);
                    if (restOfString === decode) {
                        callback(true);
                        return;
                    }
                }
                callback(false);
                return;
            }
        } else {
            callback(false);
            return;
        }
    }

    let animation = function (moonAlert, config, isOpen, callback) {
        if (isOpen) {
            moonAlert.style.animationName = config.animation.open.name;
            moonAlert.style.animationDuration = config.animation.open.duration + 'ms';
            moonAlert.style.animationTimingFunction = 'ease-in-out';
            setTimeout(function () {
                if (typeof callback === 'function') {
                    callback();
                }
            }, config.animation.open.duration);
        } else {
            moonAlert.style.animationName = config.animation.close.name;
            moonAlert.style.animationDuration = config.animation.close.duration + 'ms';
            moonAlert.style.animationTimingFunction = 'ease-in-out';
            setTimeout(function () {
                if (typeof callback === 'function') {
                    callback();
                }
            }, 1000);
        }
    }

    let buttonClose = function (moonAlert, config) {
        if (config.buttonClose) {
            let btn = document.createElement('div');
            btn.classList.add(LIBRARYNAME + '-buttonClose');
            let img = document.createElement('img');
            img.setAttribute('src', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAQAAACROWYpAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAADfsAAA37AQt3NZsAAAAHdElNRQfiDBQLCR6qS1QrAAABcUlEQVQ4y52Tz0oCURTGD8roQKvQRqsXC81nEFetpCKEoNeItMgMw6TcRLWQShAxU3uF6M+i9a/FOOrM3DuOfcvznd/cO+c7V2QicrzzQwVLNCJKgWceyHiNHRyN2dSgx9OeIzVq4xs+1KDq6tlzjBJeDUi50Bg1X09RRMiiUn/278SpK3u2hUfU6pGcoA1Nx0h4QqcuCUyaWv9TKKBXh1aAeyJEOeU/GmPZCZaXRkfTbcBQRBGkoWsTMLgMjb6x7t2hmCZNrwakVdsb42oh2rXTV+Emt4Foh8R8f8RFr4juu7Y+5Fd37iovC699g6lC1+iFGliTuBe1QqIA1y6cFP3QKMAFhoOmeV0KBahi2KeOl0YBKkQk8E216AS4eeE7YK4mCbpavy3aSzfsmZLU5nAn5JRGfRYHliaLLRGh6CvXiIk7yoGvp+SY+67y+TTF+SVyx3k4bx5My2d+1Hf6rtfMcE+bPFHdk8KizBdDsk7lD1fE8Bv5HclxAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE4LTEyLTIwVDEwOjA5OjMwKzAxOjAwUfx+hQAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxOC0xMi0yMFQxMDowOTozMCswMTowMCChxjkAAAAZdEVYdFNvZnR3YXJlAHd3dy5pbmtzY2FwZS5vcmeb7jwaAAAAAElFTkSuQmCC');

            btn.appendChild(img);
            btn.addEventListener('click', function (e) {
                remove(moonAlert, config);
            });
            moonAlert.appendChild(btn);
        }
    }

    let timeout = function (moonAlert, config) {
        if (config.progressBar === false) {
            if (config.timeout) {
                setTimeout(function () {
                    remove(moonAlert, config);
                }, config.timeout);
            }
        }
    }

    let bodyStyle = function (moonAlert, config) {
        if (config.bodyStyle.background || config.bodyStyle.border || config.bodyStyle.borderRadius || config.bodyStyle.boxShadow || config.bodyStyle.hoverClasses) {
            if (config.bodyStyle.background) {
                moonAlert['style']['background'] = config.bodyStyle.background;
            }
            if (config.bodyStyle.border) {
                moonAlert['style']['border'] = config.bodyStyle.border;
            }
            if (config.bodyStyle.borderRadius) {
                moonAlert.style.borderRadius = config.bodyStyle.borderRadius;
            }
            if(config.bodyStyle.boxShadow) {
                moonAlert.style.boxShadow = config.bodyStyle.boxShadow;
            }
            if(config.bodyStyle.progressBarColor) {
                moonAlert.querySelector('.' + LIBRARYNAME + '-progressbar').style.border = '1px solid ' + config.bodyStyle.progressBarColor;
            }
            if(config.bodyStyle.progressBarRadius) {
                moonAlert.querySelector('.' + LIBRARYNAME + '-progressbar').style.borderRadius = config.bodyStyle.progressBarRadius;
            }
        }
    }

    let theme = function (moonAlert, config) {
        let haveTheme = false;
        for (let i = 0; i < THEMES.length; i++) {
            if (THEMES[i].name === config.theme) {
                moonAlert.setAttribute('moon-theme', config.theme);
                moonAlert.querySelector('.' + LIBRARYNAME + '-icon').innerHTML = THEMES[i].icon;
                bodyStyle(moonAlert, config);
                haveTheme = true;
            }
        }
        if(haveTheme === false) {
            bodyStyle(moonAlert, config);
        }
    }

    let position = function (moonAlert, config) {
        if (POSITIONS.indexOf(config.position) !== -1) {
            switch (config.position) {
                case 'top-center':
                    return {
                        top: '10px',
                        left: (window.outerWidth / 2) - (320 / 2) + 'px'
                    }
                case 'top-left':
                    return {
                        top: '10px',
                        left: '10px'
                    }
                case 'top-right':
                    return {
                        top: '10px',
                        right: '10px'
                    }
                case 'bottom-center':
                    return {
                        bottom: '10px',
                        left: (window.outerWidth / 2) - (320 / 2) + 'px'
                    }
                case 'bottom-left':
                    return {
                        bottom: '10px',
                        left: '10px'
                    }
                case 'bottom-right':
                    return {
                        bottom: '10px',
                        right: '10px'
                    }
            }
        } else {
            return {
                top: '10px',
                right: '10px'
            }
        }
    }

    let kill = function (config) {
        if (config.kill) {
            Moon.destroy();
        }
    }

    let events = function (moonAlert, config, callback) {
        if (config.clickToClose) {
            moonAlert.addEventListener('click', function () {
                remove(moonAlert, config);
            });
        }

        if (config.events.onHover) {
            moonAlert.addEventListener('mouseenter', function (event) {
                if (config.progressBar && config.pauseOnHover && !config.resetOnHover) {
                    Moon.progress(moonAlert, config, callback).pause();
                } else if (config.progressBar && !config.pauseOnHover && config.resetOnHover) {
                    Moon.progress(moonAlert, config, callback).reset();
                }

                config.events.onHover(event);
            });
        }
        if (config.events.onHover) {
            moonAlert.addEventListener('mouseleave', function (event) {
                if (config.progressBar && config.pauseOnHover && !config.resetOnHover) {
                    Moon.progress(moonAlert, config, callback).resume();
                } else if (config.progressBar && !config.pauseOnHover && config.resetOnHover) {
                    Moon.progress(moonAlert, config, callback).start();
                }

                config.events.onHover(event);
            });
        }
        if (config.events.onClick) {
            moonAlert.style.cursor = 'pointer';
            moonAlert.addEventListener('click', function (event) {
                config.events.onClick(event);
            });
        }
        if (config.events.onClosed) {
            moonAlert.addEventListener('closed', function (event) {
                config.events.onClosed(event);
            });
        }

        if (config.events.onOpened) {
            moonAlert.addEventListener('opened', function (event) {
                config.events.onOpened(event);
            });
        }
    }

    let createContainer = function (moonAlert, config) {
        let div = document.createElement('div');
        div.style.position = 'fixed';
        div.style.zIndex = '999999';
        div.style.width = 'auto';
        div.style.height = 'auto';
        div.classList.add(LIBRARYNAME + '-container-of-moons');
        let positions = position(moonAlert, config);
        switch (config.position) {
            case 'top-left':
                div.classList.add(LIBRARYNAME + '-top-left');
                div.style.top = positions.top;
                div.style.left = positions.left;
                break;
            case 'top-center':
                div.classList.add(LIBRARYNAME + '-top-center');
                div.style.top = positions.top;
                div.style.left = positions.left;
                break;
            case 'top-right':
                div.classList.add(LIBRARYNAME + '-top-right');
                div.style.top = positions.top;
                div.style.right = positions.right;
                break;
            case 'bottom-left':
                div.classList.add(LIBRARYNAME + '-bottom-left');
                div.style.bottom = positions.bottom;
                div.style.left = positions.left;
                break;
            case 'bottom-center':
                div.classList.add(LIBRARYNAME + '-bottom-center');
                div.style.bottom = positions.bottom;
                div.style.left = positions.left;
                break;
            case 'bottom-right':
                div.classList.add(LIBRARYNAME + '-bottom-right');
                div.style.bottom = positions.bottom;
                div.style.right = positions.right;
                break;
        }
        return div;
    }

    /**
     *     METODOS PUBLICOS
     */

    Moon.set = function (moonId, option, value) {
        this.childrens[moonId][option] = value;
    }

    Moon.get = function (moonId, option) {
        return this.childrens[moonId][option];
    }

    Moon.destroy = function () {
        let alerts = document.querySelectorAll('.' + LIBRARYNAME + '-container');
        for (let i = 0; i < alerts.length; i++) {
            try {
                alerts[i].removeEventListener('click', {}, false);
                alerts[i].removeEventListener('mouseenter', {}, false);
                alerts[i].removeEventListener('mouseleave', {}, false);
                alerts[i].removeEventListener('opened', {}, false);
                alerts[i].removeEventListener('closed', {}, false);
                delete this.childrens[alerts[i].getAttribute('id')];
                alerts[i].parentElement.remove();
            } catch (e) {
                console.log(e);
            }
        }
        alerts = [];
        // this.childrens = {};
    }

    Moon.getChildrens = function () {
        return this.childrens;
    }

    Moon.progress = function (moonAlert, settings, callback) {
        let element = moonAlert.querySelector('.' + LIBRARYNAME + '-progressbar');

        return {
            start: function () {
                if (typeof settings.time.remaining === 'undefined') {
                    element.style.width = '100%';
                    setTimeout(function () {
                        element.style.transition = 'width ' + settings.timeout + 'ms linear';
                        element.style.width = '0%';

                        settings.time.start = new Date().getTime();
                        settings.time.end = settings.time.start + settings.timeout;
                        settings.time.timer = setTimeout(function () {
                            clearTimeout(settings.time.timer);
                            // eliminar el moon
                            remove(moonAlert, settings);
                        }, settings.timeout);

                        //that.set(moonId, 'time', settings.time);
                    }, settings.animation.open.duration);
                }
            },
            pause: function () {
                if (typeof settings.time.start !== 'undefined') {
                    settings.time.remaining = settings.time.end - new Date().getTime();
                    clearTimeout(settings.time.timer);
                    //that.set(moonId, 'time', settings.time);

                    if (element !== null) {
                        let computedStyleWidth = window.getComputedStyle(element).getPropertyValue('width');
                        element.style.transition = 'none';
                        element.style.width = computedStyleWidth;
                    }
                }
            },
            resume: function () {
                if (typeof settings.time.remaining !== 'undefined') {
                    if (element !== null) {
                        element.style.transition = 'width ' + settings.time.remaining + 'ms linear';
                        element.style.width = '0%';
                    }

                    settings.time.end = new Date().getTime() + settings.time.remaining;
                    settings.time.timer = setTimeout(function () {
                        clearTimeout(settings.time.timer);
                        // eliminar moon
                        remove(moonAlert, settings);
                    }, settings.time.remaining);
                    //that.set(moonId, 'time', settings.time);
                } else {
                    this.start();
                }
            },
            reset: function () {
                clearTimeout(settings.time.timer);
                delete settings.time.remaining;
                //that.set(moonId, 'time', settings.time);

                if (element !== null) {
                    element.style.transition = 'none';
                    element.style.width = '100%';
                }
            }
        }
    }

    Moon.show = function (optionsConfig) {
        let that = this;
        let options = extend(DEFAULTS, optionsConfig);
        options.id = generateID(optionsConfig.title + optionsConfig.text) + '@' + Math.random() * 100 + 1;
        options.time = {};
        let moonAlert = createTemplate(options);
        moonAlert.setAttribute('id', options.id);
        moonAlert.setAttribute('alert', 'Moon');

        preventDuplicates(options.preventDuplicates, optionsConfig.title + optionsConfig.text, function (response) {
            // if response === true, then have duplicates.
            if (response === false) {
                Moon.childrens[options.id] = options;

                // !agregar transiciones
                animation(moonAlert, Moon.childrens[options.id], true, function (msg) {
                    if (options.events.onOpened) {
                        let event = new CustomEvent('opened', {
                            detail: that.childrens[options.id],
                            bubbles: true,
                            cancelable: true
                        });
                        moonAlert.dispatchEvent(event);
                    }
                });

                //!agregar boton de cerrar
                buttonClose(moonAlert, Moon.childrens[options.id])

                //!llamar el cerrado automatico
                timeout(moonAlert, Moon.childrens[options.id], function () {})

                //!elegir la posicion de la alerta
                position(moonAlert, Moon.childrens[options.id])

                //!ver si se deben eliminar los alerts anteriores
                kill(Moon.childrens[options.id])

                //!ver eventos normales del elemento
                events(moonAlert, Moon.childrens[options.id], function () {});

                //!progressbar
                if (options.progressBar) {
                    progressBar(moonAlert, Moon.childrens[options.id]);
                    Moon.progress(moonAlert, options, function () {}).start();
                }

                //!agregar el tema
                theme(moonAlert, Moon.childrens[options.id]);

                if (document.querySelector('.' + LIBRARYNAME + '-' + that.childrens[options.id].position)) {
                    if (options.newestOnTop) {
                        let container = document.querySelector('.' + LIBRARYNAME + '-' + that.childrens[options.id].position);
                        container.insertBefore(moonAlert, container.firstChild);
                    } else {
                        document.querySelector('.' + LIBRARYNAME + '-' + that.childrens[options.id].position).appendChild(moonAlert);
                    }
                } else {
                    let container = createContainer(moonAlert, options);
                    container.appendChild(moonAlert);
                    document.body.appendChild(container);
                }

                that.childrens[options.id].target = moonAlert;
            }
        });
    }

    if (window.Moon === 'undefined') {
        window.Moon = Moon;
    } else {
        return Moon;
    }
})(window, document);
