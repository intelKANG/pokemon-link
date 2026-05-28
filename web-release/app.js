(() => {
  const boardEl = document.querySelector("#board");
  const linkLayer = document.querySelector("#link-layer");
  const fxLayer = document.querySelector("#fx-layer");
  const boardWrapEl = document.querySelector(".board-wrap");
  const overlay = document.querySelector("#overlay");
  const overlayKicker = document.querySelector("#overlay-kicker");
  const overlayTitle = document.querySelector("#overlay-title");
  const overlayText = document.querySelector("#overlay-text");
  const startButton = document.querySelector("#start");
  const levelEl = document.querySelector("#level");
  const scoreEl = document.querySelector("#score");
  const mobileScoreEl = document.querySelector("#mobile-score");
  const timeEl = document.querySelector("#time");
  const timeBarEl = document.querySelector("#time-bar");
  const modeLabelEl = document.querySelector("#mode-label");
  const leftEl = document.querySelector("#left");
  const hintReadoutEl = document.querySelector("#hint-readout");
  const hintLeftEl = document.querySelector("#hint-left");
  const shuffleLeftEl = document.querySelector("#shuffle-left");
  const newGameButton = document.querySelector("#new-game");
  const nextLevelButton = document.querySelector("#next-level");
  const pauseButton = document.querySelector("#pause");
  const hintButton = document.querySelector("#hint");
  const shuffleButton = document.querySelector("#shuffle");
  const soundButton = document.querySelector("#sound");
  const difficultyLabel = document.querySelector("#difficulty-label");
  const showRulesButton = document.querySelector("#show-rules");
  const mobilePauseButton = document.querySelector(".mobile-pause");
  const mobileHintButton = document.querySelector(".mobile-hint");
  const mobileShuffleButton = document.querySelector(".mobile-shuffle");
  const optionsToggleButton = document.querySelector('[data-menu="options-menu"]:not(.mobile-shuffle)');
  const optionsPanel = document.querySelector("#options-panel");

  const i18n = {
    zh: {
      title: "精灵连连看",
      menuPause: "暂停",
      menuResume: "继续",
      menuHint: "提示",
      menuShuffle: "洗牌",
      menuOptions: "选项",
      restart: "重新开始",
      nextLevel: "下一关",
      easy: "简单",
      normal: "普通",
      hard: "困难",
      soundOn: "音效 开",
      soundOff: "音效 关",
      classicSound: "复古音色",
      softSound: "柔和音色",
      rules: "规则",
      close: "关闭",
      languageSystem: "跟随系统",
      languageZh: "中文",
      languageEn: "English",
      optionGroupGame: "游戏",
      optionGroupDifficulty: "难度",
      optionGroupSound: "音效",
      score: "得分",
      level: "关卡",
      left: "剩余",
      hint: "提示",
      readyKicker: "准备开始",
      readyTitle: "寻找相同宝可梦",
      readyText: "连接路径最多转两次，清空棋盘进入下一关。",
      start: "开始游戏",
      pauseKicker: "已暂停",
      pauseTitle: "休息一下",
      pauseText: "点击继续回到棋盘。",
      continue: "继续",
      timeoutKicker: "时间到",
      timeoutTitle: "再来一局",
      timeoutText: "小精灵们还没有全部回到图鉴。",
      winKicker: "过关",
      winTitle: "进入下一关",
      winText: "下一关会改变棋盘移动规则，时间也会更紧。",
      rulesKicker: "规则",
      rulesTitle: "每关都有变化",
      rulesText: "点两张相同宝可梦。连线最多转两次；后续关卡会出现向上、向下、左右分离等移动规则。",
      modeStatic: "不变化",
      modeDown: "向下移动",
      modeLeft: "向左移动",
      modeRight: "向右移动",
      modeUp: "向上移动",
      modeSplitVertical: "上下分离",
      modeSplitHorizontal: "左右分离",
      modeGather: "向内靠拢",
    },
    en: {
      title: "Pokemon Link",
      menuPause: "Pause",
      menuResume: "Resume",
      menuHint: "Hint",
      menuShuffle: "Shuffle",
      menuOptions: "Options",
      restart: "Restart",
      nextLevel: "Next",
      easy: "Easy",
      normal: "Normal",
      hard: "Hard",
      soundOn: "Sound On",
      soundOff: "Sound Off",
      classicSound: "Classic SFX",
      softSound: "Soft SFX",
      rules: "Rules",
      close: "Close",
      languageSystem: "System",
      languageZh: "中文",
      languageEn: "English",
      optionGroupGame: "Game",
      optionGroupDifficulty: "Difficulty",
      optionGroupSound: "Sound",
      score: "Score",
      level: "Level",
      left: "Left",
      hint: "Hint",
      readyKicker: "Ready",
      readyTitle: "Match Pokemon",
      readyText: "Connect matching tiles with at most two turns. Clear the board to advance.",
      start: "Start",
      pauseKicker: "Paused",
      pauseTitle: "Take a Break",
      pauseText: "Tap resume to return to the board.",
      continue: "Resume",
      timeoutKicker: "Time Up",
      timeoutTitle: "Try Again",
      timeoutText: "Some Pokemon are still waiting on the board.",
      winKicker: "Cleared",
      winTitle: "Next Level",
      winText: "The next level changes tile movement and tightens the timer.",
      rulesKicker: "Rules",
      rulesTitle: "Each Level Changes",
      rulesText: "Tap two matching Pokemon. Lines may turn at most twice; later levels shift tiles up, down, split, or gather.",
      modeStatic: "No Shift",
      modeDown: "Shift Down",
      modeLeft: "Shift Left",
      modeRight: "Shift Right",
      modeUp: "Shift Up",
      modeSplitVertical: "Split Up/Down",
      modeSplitHorizontal: "Split Left/Right",
      modeGather: "Gather Inward",
    },
  };

  const monsters = [
    { name: "妙蛙种子", image: "assets/pokemon/1.png" },
    { name: "小火龙", image: "assets/pokemon/4.png" },
    { name: "杰尼龟", image: "assets/pokemon/7.png" },
    { name: "绿毛虫", image: "assets/pokemon/10.png" },
    { name: "波波", image: "assets/pokemon/16.png" },
    { name: "皮卡丘", image: "assets/pokemon/25.png" },
    { name: "胖丁", image: "assets/pokemon/39.png" },
    { name: "喵喵", image: "assets/pokemon/52.png" },
    { name: "可达鸭", image: "assets/pokemon/54.png" },
    { name: "卡蒂狗", image: "assets/pokemon/58.png" },
    { name: "蚊香蝌蚪", image: "assets/pokemon/60.png" },
    { name: "耿鬼", image: "assets/pokemon/94.png" },
  ];

  const state = {
    rows: 7,
    cols: 12,
    level: 0,
    score: 0,
    time: 160,
    maxTime: 160,
    left: 0,
    hints: 4,
    shuffles: 2,
    running: false,
    paused: false,
    selected: null,
    board: [],
    timer: null,
    sound: true,
    soundStyle: "soft",
    difficulty: "easy",
    languagePreference: localStorage.getItem("pokemonLinkLanguage") || "system",
    audio: null,
  };

  const levelRules = [
    { key: "modeStatic", mode: "static", icons: 8, timeBonus: 12 },
    { key: "modeDown", mode: "down", icons: 9, timeBonus: 22 },
    { key: "modeLeft", mode: "left", icons: 10, timeBonus: 24 },
    { key: "modeRight", mode: "right", icons: 10, timeBonus: 24 },
    { key: "modeUp", mode: "up", icons: 11, timeBonus: 24 },
    { key: "modeSplitVertical", mode: "splitVertical", icons: 11, timeBonus: 32 },
    { key: "modeSplitHorizontal", mode: "splitHorizontal", icons: 12, timeBonus: 32 },
    { key: "modeGather", mode: "gather", icons: 12, timeBonus: 36 },
  ];

  const difficulties = {
    easy: {
      label: "Easy",
      landscape: { rows: 7, cols: 12 },
      portrait: { rows: 10, cols: 6 },
      time: 125,
      hints: 4,
      shuffles: 3,
    },
    normal: {
      label: "Normal",
      landscape: { rows: 8, cols: 12 },
      portrait: { rows: 12, cols: 6 },
      time: 105,
      hints: 3,
      shuffles: 2,
    },
    hard: {
      label: "Hard",
      landscape: { rows: 8, cols: 14 },
      portrait: { rows: 12, cols: 8 },
      time: 90,
      hints: 2,
      shuffles: 1,
    },
  };

  function chooseSize() {
    const config = difficulties[state.difficulty];
    return window.innerHeight > window.innerWidth ? config.portrait : config.landscape;
  }

  function currentLevelRule() {
    const rule = levelRules[state.level % levelRules.length];
    const cycle = Math.floor(state.level / levelRules.length);
    return {
      ...rule,
      icons: Math.min(monsters.length, rule.icons + cycle),
      cycle,
    };
  }

  function calculateRoundTime(config, rule, rows, cols) {
    const pairs = (rows * cols) / 2;
    const perPair = {
      easy: 3.15,
      normal: 2.85,
      hard: 2.55,
    }[state.difficulty];
    const cyclePressure = rule.cycle * 10;
    const baseline = pairs * perPair + rule.timeBonus - cyclePressure;
    const minimum = state.difficulty === "easy" ? 95 : state.difficulty === "normal" ? 80 : 65;
    const maximum = config.time + pairs * 1.1;
    return Math.round(Math.max(minimum, Math.min(maximum, baseline)));
  }

  function activeLanguage() {
    if (state.languagePreference === "zh" || state.languagePreference === "en") return state.languagePreference;
    return (navigator.language || "").toLowerCase().startsWith("zh") ? "zh" : "en";
  }

  function t(key) {
    return i18n[activeLanguage()][key] || i18n.zh[key] || key;
  }

  function setText(selector, text) {
    document.querySelectorAll(selector).forEach((node) => {
      node.textContent = text;
    });
  }

  function syncLanguageButtons() {
    document.querySelectorAll(".option-language").forEach((button) => {
      button.classList.toggle("is-active", button.dataset.language === state.languagePreference);
    });
  }

  function refreshStaticText() {
    document.documentElement.lang = activeLanguage() === "zh" ? "zh-CN" : "en";
    document.title = t("title");
    document.querySelector(".brand h1").textContent = t("title");
    setText('[data-option-action="restart"], #new-game', t("restart"));
    setText('[data-option-action="next"], #next-level', t("nextLevel"));
    setText('[data-difficulty="easy"]', t("easy"));
    setText('[data-difficulty="normal"]', t("normal"));
    setText('[data-difficulty="hard"]', t("hard"));
    setText('[data-sound-style="classic"]', t("classicSound"));
    setText('[data-sound-style="soft"]', t("softSound"));
    setText('[data-menu-command="rules"], #show-rules, [data-option-action="rules"]', t("rules"));
    setText('[data-option-action="close"]', t("close"));
    setText('[data-language="system"]', t("languageSystem"));
    setText('[data-language="zh"]', t("languageZh"));
    setText('[data-language="en"]', t("languageEn"));
    setText('[data-option-group="game"]', t("optionGroupGame"));
    setText('[data-option-group="difficulty"]', t("optionGroupDifficulty"));
    setText('[data-option-group="sound"]', t("optionGroupSound"));
    document.querySelector(".options-card h2").textContent = t("menuOptions");
    const statLabels = document.querySelectorAll(".mini-stat span");
    if (statLabels[0]) statLabels[0].textContent = t("level");
    if (statLabels[1]) statLabels[1].textContent = t("left");
    if (statLabels[2]) statLabels[2].textContent = t("hint");
    if (statLabels[3]) statLabels[3].textContent = t("score");
    syncLanguageButtons();
  }

  function setLanguagePreference(value) {
    state.languagePreference = value;
    localStorage.setItem("pokemonLinkLanguage", value);
    refreshStaticText();
    updateHud();
    refreshVisibleOverlay();
  }

  function makeMatrix(rows, cols, fill = null) {
    return Array.from({ length: rows + 2 }, () => Array(cols + 2).fill(fill));
  }

  function shuffle(values) {
    for (let i = values.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [values[i], values[j]] = [values[j], values[i]];
    }
    return values;
  }

  function newRound(keepScore = false) {
    if (!keepScore) {
      state.level = 0;
      state.score = 0;
    }
    prepareRoundState();
    state.selected = null;
    state.running = true;
    state.paused = false;
    hideBoardUntilFit();
    clearEffects();
    buildBoard();
    render();
    hideOverlay();
    startTimer();
  }

  function prepareRoundState() {
    const size = chooseSize();
    const config = difficulties[state.difficulty];
    const rule = currentLevelRule();
    state.rows = size.rows;
    state.cols = size.cols;
    state.maxTime = calculateRoundTime(config, rule, state.rows, state.cols);
    state.time = state.maxTime;
    state.hints = Math.max(1, config.hints - Math.floor(state.level / 5));
    state.shuffles = Math.max(1, config.shuffles - Math.floor(state.level / 6));
    state.left = state.rows * state.cols;
  }

  function buildBoard() {
    state.board = makeMatrix(state.rows, state.cols, 0);
    state.left = state.rows * state.cols;
    const pairCount = (state.rows * state.cols) / 2;
    const rule = currentLevelRule();
    const values = [];
    for (let i = 0; i < pairCount; i += 1) {
      const id = (i % rule.icons) + 1;
      values.push(id, id);
    }
    shuffle(values);
    for (let row = 1; row <= state.rows; row += 1) {
      for (let col = 1; col <= state.cols; col += 1) {
        state.board[row][col] = values.pop();
      }
    }
    makeSolvable();
  }

  function makeSolvable() {
    let attempts = 0;
    while (!findPair() && attempts < 40) {
      shuffleRemaining();
      attempts += 1;
    }
  }

  function startTimer() {
    clearInterval(state.timer);
    state.timer = setInterval(() => {
      if (!state.running || state.paused) return;
      state.time -= 1;
      updateHud();
      if (state.time <= 0) {
        state.running = false;
        clearInterval(state.timer);
        play("lose");
        showOverlay(t("timeoutKicker"), t("timeoutTitle"), t("timeoutText"), t("restart"), "restart");
      }
    }, 1000);
  }

  function render() {
    document.documentElement.style.setProperty("--rows", state.rows);
    document.documentElement.style.setProperty("--cols", state.cols);
    boardEl.innerHTML = "";
    linkLayer.innerHTML = "";

    for (let row = 1; row <= state.rows; row += 1) {
      for (let col = 1; col <= state.cols; col += 1) {
        const value = state.board[row][col];
        const tile = document.createElement("button");
        tile.className = "tile";
        tile.type = "button";
        tile.dataset.row = row;
        tile.dataset.col = col;
        tile.setAttribute("aria-label", value === 0 ? "空格" : monsters[value - 1].name);

        if (value === 0) {
          tile.classList.add("is-gone");
          tile.disabled = true;
        } else {
          const monster = monsters[value - 1];
          const avatar = document.createElement("img");
          avatar.className = "pokemon";
          avatar.src = monster.image;
          avatar.alt = "";
          avatar.draggable = false;
          tile.append(avatar);
        }
        boardEl.append(tile);
      }
    }
    updateHud();
    fitBoard();
    revealBoardAfterFit();
  }

  function hideBoardUntilFit() {
    if (boardWrapEl) boardWrapEl.classList.remove("is-layout-ready");
  }

  function clearEffects() {
    if (fxLayer) fxLayer.innerHTML = "";
  }

  function revealBoardAfterFit() {
    if (!boardWrapEl) return;
    requestAnimationFrame(() => boardWrapEl.classList.add("is-layout-ready"));
  }

  function updateHud() {
    const config = difficulties[state.difficulty];
    levelEl.textContent = state.level + 1;
    scoreEl.textContent = state.score;
    if (mobileScoreEl) mobileScoreEl.textContent = state.score;
    timeEl.textContent = state.time;
    leftEl.textContent = state.left;
    hintLeftEl.textContent = state.hints;
    hintReadoutEl.textContent = state.hints;
    shuffleLeftEl.textContent = state.shuffles;
    difficultyLabel.textContent = config.label;
    if (modeLabelEl) modeLabelEl.textContent = t(currentLevelRule().key);
    soundButton.textContent = state.sound ? t("soundOn") : t("soundOff");
    document.querySelectorAll('[data-option-action="sound"]').forEach((button) => {
      button.textContent = state.sound ? t("soundOn") : t("soundOff");
    });
    pauseButton.textContent = state.paused ? t("menuResume") : t("menuPause");
    if (mobilePauseButton) mobilePauseButton.textContent = state.paused ? t("menuResume") : t("menuPause");
    if (mobileHintButton) mobileHintButton.textContent = `${t("menuHint")} ${state.hints}`;
    if (mobileShuffleButton) mobileShuffleButton.textContent = `${t("menuShuffle")} ${state.shuffles}`;
    if (optionsToggleButton) optionsToggleButton.textContent = t("menuOptions");
    shuffleButton.innerHTML = `${t("menuShuffle")} <strong id="shuffle-left">${state.shuffles}</strong>`;
    hintButton.innerHTML = `${t("menuHint")} <strong id="hint-left">${state.hints}</strong>`;
    if (timeBarEl) {
      timeBarEl.style.transform = `scaleX(${Math.max(0, state.time / state.maxTime)})`;
    }
    hintButton.disabled = !state.running || state.paused || state.hints <= 0;
    shuffleButton.disabled = !state.running || state.paused || state.shuffles <= 0;
  }

  function fitBoard() {
    const panel = document.querySelector(".board-panel");
    if (!panel) return;
    const rect = panel.getBoundingClientRect();
    const portrait = window.innerHeight > window.innerWidth;
    const viewportW = window.visualViewport?.width || window.innerWidth || rect.width;
    const availableW = Math.max(220, Math.min(rect.width, viewportW) - (portrait ? 8 : 24));
    const availableH = Math.max(260, rect.height - (portrait ? 8 : 18));
    const padUnits = portrait ? 0.72 : 2;
    const tileByW = availableW / (state.cols + padUnits);
    const tileByH = availableH / (state.rows + padUnits);
    const maxTile = portrait ? 72 : state.difficulty === "hard" ? 66 : 76;
    const minTile = portrait ? 34 : 36;
    const tile = Math.floor(Math.max(minTile, Math.min(maxTile, tileByW, tileByH)));
    document.documentElement.style.setProperty("--tile", `${tile}px`);
  }

  function showOverlay(kicker, title, text, button, action = "start") {
    if (action !== "continue") overlayKicker.dataset.kind = "";
    overlayKicker.textContent = kicker;
    overlayTitle.textContent = title;
    overlayText.textContent = text;
    startButton.textContent = button;
    startButton.dataset.action = action;
    overlay.classList.add("is-visible");
  }

  function refreshVisibleOverlay() {
    if (!overlay.classList.contains("is-visible")) return;
    const action = startButton.dataset.action || "start";
    if (action === "start") {
      showOverlay(t("readyKicker"), t("readyTitle"), t("readyText"), t("start"), "start");
    }
    if (action === "restart") {
      showOverlay(t("timeoutKicker"), t("timeoutTitle"), t("timeoutText"), t("restart"), "restart");
    }
    if (action === "continue") {
      const isRules = overlayKicker.dataset.kind === "rules";
      if (isRules) showRules();
      else showOverlay(t("pauseKicker"), t("pauseTitle"), t("pauseText"), t("continue"), "continue");
    }
    if (action === "next") {
      showOverlay(t("winKicker"), t("winTitle"), t("winText"), t("nextLevel"), "next");
    }
  }

  function hideOverlay() {
    overlay.classList.remove("is-visible");
  }

  function handleTileClick(event) {
    const tile = event.target.closest(".tile");
    if (!tile || !state.running || state.paused || tile.disabled) return;
    const row = Number(tile.dataset.row);
    const col = Number(tile.dataset.col);
    if (state.board[row][col] === 0) return;

    clearHints();
    if (state.selected && state.selected.row === row && state.selected.col === col) {
      state.selected = null;
      tile.classList.remove("is-selected");
      return;
    }

    if (!state.selected) {
      state.selected = { row, col };
      tile.classList.add("is-selected");
      play("select");
      return;
    }

    const first = state.selected;
    const path = canConnect(first, { row, col });
    clearSelection();
    if (path) {
      drawPath(path);
      removePair(first, { row, col });
      play("match");
    } else {
      state.selected = { row, col };
      tile.classList.add("is-selected");
      play("bad");
    }
  }

  function clearSelection() {
    state.selected = null;
    document.querySelectorAll(".tile.is-selected").forEach((tile) => tile.classList.remove("is-selected"));
  }

  function clearHints() {
    document.querySelectorAll(".tile.is-hint").forEach((tile) => tile.classList.remove("is-hint"));
  }

  function removePair(a, b) {
    burstAt(a);
    burstAt(b);
    state.board[a.row][a.col] = 0;
    state.board[b.row][b.col] = 0;
    state.left -= 2;
    state.score += 20 + state.level * 4;
    const mode = currentLevelRule().mode;
    setTimeout(() => {
      applyBoardMode(mode);
      render();
    }, 130);

    if (state.left === 0) {
      state.running = false;
      clearInterval(state.timer);
      state.score += state.time * 2;
      state.level += 1;
      updateHud();
      play("win");
      showOverlay(t("winKicker"), t("winTitle"), t("winText"), t("nextLevel"), "next");
      return;
    }

    setTimeout(() => {
      if (!findPair()) {
        shuffleRemaining();
        render();
      }
    }, 210);
    updateHud();
  }

  function compactLine(values, length, direction) {
    const filled = values.filter((value) => value !== 0);
    const empty = Array(Math.max(0, length - filled.length)).fill(0);
    return direction === "end" ? [...empty, ...filled] : [...filled, ...empty];
  }

  function applyBoardMode(mode) {
    if (mode === "static") return;
    if (mode === "down" || mode === "up") {
      for (let col = 1; col <= state.cols; col += 1) {
        const values = [];
        for (let row = 1; row <= state.rows; row += 1) values.push(state.board[row][col]);
        const next = compactLine(values, state.rows, mode === "down" ? "end" : "start");
        for (let row = 1; row <= state.rows; row += 1) state.board[row][col] = next[row - 1];
      }
    }
    if (mode === "left" || mode === "right") {
      for (let row = 1; row <= state.rows; row += 1) {
        const values = [];
        for (let col = 1; col <= state.cols; col += 1) values.push(state.board[row][col]);
        const next = compactLine(values, state.cols, mode === "right" ? "end" : "start");
        for (let col = 1; col <= state.cols; col += 1) state.board[row][col] = next[col - 1];
      }
    }
    if (mode === "splitVertical") {
      const mid = Math.ceil(state.rows / 2);
      for (let col = 1; col <= state.cols; col += 1) {
        const top = [];
        const bottom = [];
        for (let row = 1; row <= mid; row += 1) top.push(state.board[row][col]);
        for (let row = mid + 1; row <= state.rows; row += 1) bottom.push(state.board[row][col]);
        const nextTop = compactLine(top, top.length, "start");
        const nextBottom = compactLine(bottom, bottom.length, "end");
        for (let row = 1; row <= mid; row += 1) state.board[row][col] = nextTop[row - 1];
        for (let row = mid + 1; row <= state.rows; row += 1) state.board[row][col] = nextBottom[row - mid - 1];
      }
    }
    if (mode === "splitHorizontal") {
      const mid = Math.ceil(state.cols / 2);
      for (let row = 1; row <= state.rows; row += 1) {
        const left = [];
        const right = [];
        for (let col = 1; col <= mid; col += 1) left.push(state.board[row][col]);
        for (let col = mid + 1; col <= state.cols; col += 1) right.push(state.board[row][col]);
        const nextLeft = compactLine(left, left.length, "start");
        const nextRight = compactLine(right, right.length, "end");
        for (let col = 1; col <= mid; col += 1) state.board[row][col] = nextLeft[col - 1];
        for (let col = mid + 1; col <= state.cols; col += 1) state.board[row][col] = nextRight[col - mid - 1];
      }
    }
    if (mode === "gather") {
      const mid = Math.ceil(state.cols / 2);
      for (let row = 1; row <= state.rows; row += 1) {
        const left = [];
        const right = [];
        for (let col = 1; col <= mid; col += 1) left.push(state.board[row][col]);
        for (let col = mid + 1; col <= state.cols; col += 1) right.push(state.board[row][col]);
        const nextLeft = compactLine(left, left.length, "end");
        const nextRight = compactLine(right, right.length, "start");
        for (let col = 1; col <= mid; col += 1) state.board[row][col] = nextLeft[col - 1];
        for (let col = mid + 1; col <= state.cols; col += 1) state.board[row][col] = nextRight[col - mid - 1];
      }
    }
  }

  function valueAt(point) {
    return state.board[point.row]?.[point.col];
  }

  function isClear(point) {
    if (point.row < 0 || point.col < 0 || point.row > state.rows + 1 || point.col > state.cols + 1) return false;
    return state.board[point.row][point.col] === 0;
  }

  function clearLine(a, b) {
    if (a.row !== b.row && a.col !== b.col) return false;
    const rowStep = Math.sign(b.row - a.row);
    const colStep = Math.sign(b.col - a.col);
    let row = a.row + rowStep;
    let col = a.col + colStep;
    while (row !== b.row || col !== b.col) {
      if (state.board[row][col] !== 0) return false;
      row += rowStep;
      col += colStep;
    }
    return true;
  }

  function canConnect(a, b) {
    if (valueAt(a) === 0 || valueAt(a) !== valueAt(b)) return null;
    if (clearLine(a, b)) return [a, b];

    const p1 = { row: a.row, col: b.col };
    const p2 = { row: b.row, col: a.col };
    if (isClear(p1) && clearLine(a, p1) && clearLine(p1, b)) return [a, p1, b];
    if (isClear(p2) && clearLine(a, p2) && clearLine(p2, b)) return [a, p2, b];

    for (let row = 0; row <= state.rows + 1; row += 1) {
      const c1 = { row, col: a.col };
      const c2 = { row, col: b.col };
      if (isClear(c1) && isClear(c2) && clearLine(a, c1) && clearLine(c1, c2) && clearLine(c2, b)) {
        return [a, c1, c2, b];
      }
    }
    for (let col = 0; col <= state.cols + 1; col += 1) {
      const c1 = { row: a.row, col };
      const c2 = { row: b.row, col };
      if (isClear(c1) && isClear(c2) && clearLine(a, c1) && clearLine(c1, c2) && clearLine(c2, b)) {
        return [a, c1, c2, b];
      }
    }
    return null;
  }

  function findPair() {
    const byValue = new Map();
    for (let row = 1; row <= state.rows; row += 1) {
      for (let col = 1; col <= state.cols; col += 1) {
        const value = state.board[row][col];
        if (value === 0) continue;
        const group = byValue.get(value) || [];
        const current = { row, col };
        for (const other of group) {
          const path = canConnect(other, current);
          if (path) return { a: other, b: current, path };
        }
        group.push(current);
        byValue.set(value, group);
      }
    }
    return null;
  }

  function shuffleRemaining() {
    const positions = [];
    const values = [];
    for (let row = 1; row <= state.rows; row += 1) {
      for (let col = 1; col <= state.cols; col += 1) {
        if (state.board[row][col] !== 0) {
          positions.push({ row, col });
          values.push(state.board[row][col]);
        }
      }
    }
    shuffle(values);
    positions.forEach((pos, index) => {
      state.board[pos.row][pos.col] = values[index];
    });
  }

  function useHint() {
    if (!state.running || state.paused || state.hints <= 0) return;
    const pair = findPair();
    if (!pair) return;
    state.hints -= 1;
    clearHints();
    getTile(pair.a).classList.add("is-hint");
    getTile(pair.b).classList.add("is-hint");
    drawPath(pair.path);
    play("hint");
    updateHud();
    setTimeout(clearHints, 900);
  }

  function useShuffle() {
    if (!state.running || state.paused || state.shuffles <= 0) return;
    state.shuffles -= 1;
    clearEffects();
    shuffleRemaining();
    makeSolvable();
    clearSelection();
    clearHints();
    render();
    play("shuffle");
  }

  function getTile(point) {
    return boardEl.querySelector(`[data-row="${point.row}"][data-col="${point.col}"]`);
  }

  function boardPoint(point) {
    const wrap = document.querySelector(".board-wrap").getBoundingClientRect();
    const board = boardEl.getBoundingClientRect();
    const firstTile = boardEl.querySelector(".tile");
    const tile = firstTile ? firstTile.getBoundingClientRect().width : 48;
    const gap = 0;
    const pad = Number.parseFloat(getComputedStyle(boardEl).paddingLeft) || tile;
    const innerW = state.cols * tile + (state.cols - 1) * gap;
    const innerH = state.rows * tile + (state.rows - 1) * gap;
    const x =
      board.left -
      wrap.left +
      (point.col === 0
        ? pad / 2
        : point.col === state.cols + 1
          ? pad + innerW + pad / 2
          : pad + (point.col - 1) * (tile + gap) + tile / 2);
    const y =
      board.top -
      wrap.top +
      (point.row === 0
        ? pad / 2
        : point.row === state.rows + 1
          ? pad + innerH + pad / 2
          : pad + (point.row - 1) * (tile + gap) + tile / 2);
    return { x, y };
  }

  function drawPath(path) {
    const points = path.map(boardPoint);
    linkLayer.innerHTML = "";
    linkLayer.setAttribute("viewBox", `0 0 ${linkLayer.clientWidth} ${linkLayer.clientHeight}`);
    const polyline = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
    polyline.setAttribute("points", points.map((p) => `${p.x},${p.y}`).join(" "));
    polyline.setAttribute("fill", "none");
    polyline.setAttribute("stroke", "#2f80ed");
    polyline.setAttribute("stroke-width", "5");
    polyline.setAttribute("stroke-linecap", "round");
    polyline.setAttribute("stroke-linejoin", "round");
    linkLayer.append(polyline);
    setTimeout(() => {
      linkLayer.innerHTML = "";
    }, 360);
  }

  function burstAt(point) {
    if (!fxLayer) return;
    const tile = getTile(point);
    const center = boardPoint(point);
    const effect = document.createElement("span");
    effect.className = "tile-shatter";
    effect.style.left = `${center.x}px`;
    effect.style.top = `${center.y}px`;
    effect.style.setProperty("--tile-image", tile?.querySelector("img") ? `url("${tile.querySelector("img").src}")` : "none");

    const pieces = [
      [0, 0, -26, -24, -32],
      [1, 0, 8, -30, 22],
      [2, 0, 34, -12, 48],
      [0, 1, -34, 4, -58],
      [1, 1, -4, 15, 18],
      [2, 1, 29, 12, 62],
      [0, 2, -23, 35, 34],
      [1, 2, 6, 42, -24],
      [2, 2, 35, 31, 36],
    ];

    pieces.forEach(([col, row, x, y, rotate], index) => {
      const shard = document.createElement("span");
      shard.className = "tile-piece";
      shard.style.setProperty("--sx", `${col * 50}%`);
      shard.style.setProperty("--sy", `${row * 50}%`);
      shard.style.setProperty("--x", `${x + (Math.random() - 0.5) * 8}px`);
      shard.style.setProperty("--y", `${y + (Math.random() - 0.5) * 8}px`);
      shard.style.setProperty("--r", `${rotate + Math.round(Math.random() * 16 - 8)}deg`);
      shard.style.setProperty("--d", `${index * 8}ms`);
      effect.append(shard);
    });

    fxLayer.append(effect);
    setTimeout(() => effect.remove(), 360);
  }

  function ensureAudio() {
    if (!state.sound) return null;
    if (!state.audio) state.audio = new (window.AudioContext || window.webkitAudioContext)();
    if (state.audio.state === "suspended") state.audio.resume();
    return state.audio;
  }

  function tone(freq, duration, delay = 0, type = "sine") {
    const audio = ensureAudio();
    if (!audio) return;
    const start = audio.currentTime + delay;
    const osc = audio.createOscillator();
    const gain = audio.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, start);
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(state.soundStyle === "classic" ? 0.09 : 0.045, start + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
    osc.connect(gain).connect(audio.destination);
    osc.start(start);
    osc.stop(start + duration + 0.04);
  }

  function play(name) {
    if (!state.sound) return;
    const classic = {
      select: [[880, 0.025, 0, "square"]],
      match: [[1040, 0.035, 0, "square"], [1320, 0.04, 0.045, "square"]],
      bad: [[130, 0.08, 0, "sawtooth"]],
      hint: [[740, 0.035, 0, "square"], [990, 0.035, 0.045, "square"]],
      shuffle: [[360, 0.035, 0, "square"], [520, 0.035, 0.04, "square"], [760, 0.04, 0.08, "square"]],
      win: [[660, 0.05, 0, "square"], [880, 0.05, 0.06, "square"], [1174, 0.09, 0.12, "square"]],
      lose: [[220, 0.08, 0, "sawtooth"], [164, 0.12, 0.09, "sawtooth"]],
    };
    const soft = {
      select: [[520, 0.05]],
      match: [[620, 0.06], [820, 0.08, 0.06]],
      bad: [[170, 0.09, 0, "triangle"]],
      hint: [[440, 0.05], [660, 0.08, 0.05]],
      shuffle: [[300, 0.06], [420, 0.06, 0.05], [560, 0.08, 0.1]],
      win: [[523, 0.08], [659, 0.08, 0.08], [784, 0.16, 0.16]],
      lose: [[220, 0.12], [150, 0.18, 0.1]],
    };
    const notes = (state.soundStyle === "classic" ? classic : soft)[name] || [];
    notes.forEach(([freq, duration, delay = 0, type = "sine"]) => tone(freq, duration, delay, type));
  }

  function closeMenus(except = null) {
    document.querySelectorAll(".menu-popover").forEach((menu) => {
      if (menu !== except) menu.hidden = true;
    });
    document.querySelectorAll(".menu-toggle, .language-toggle").forEach((button) => {
      if (!except || button.dataset.menu !== except.id) button.classList.remove("is-open");
    });
  }

  function togglePause() {
    if (!state.running) return;
    state.paused = !state.paused;
    if (state.paused) {
      overlayKicker.dataset.kind = "pause";
      showOverlay(t("pauseKicker"), t("pauseTitle"), t("pauseText"), t("continue"), "continue");
    } else {
      hideOverlay();
    }
    updateHud();
  }

  function setDifficulty(value) {
    state.difficulty = value;
    document.querySelectorAll(".difficulty, .option-difficulty").forEach((button) => {
      button.classList.toggle("is-active", button.dataset.difficulty === value);
    });
    newRound(false);
  }

  function setSoundStyle(value) {
    state.soundStyle = value;
    document.querySelectorAll(".sound-style, .option-sound-style").forEach((button) => {
      button.classList.toggle("is-active", button.dataset.soundStyle === value);
    });
    play("select");
  }

  function openOptionsMenu() {
    if (!optionsPanel) return;
    closeMenus();
    optionsPanel.hidden = false;
    if (optionsToggleButton) optionsToggleButton.classList.add("is-open");
  }

  function closeOptionsMenu() {
    if (optionsPanel) optionsPanel.hidden = true;
    if (optionsToggleButton) optionsToggleButton.classList.remove("is-open");
  }

  function showRules() {
    closeOptionsMenu();
    overlayKicker.dataset.kind = "rules";
    showOverlay(t("rulesKicker"), t("rulesTitle"), t("rulesText"), t("continue"), "continue");
    state.paused = state.running;
    updateHud();
  }

  boardEl.addEventListener("click", handleTileClick);
  startButton.addEventListener("click", () => {
    ensureAudio();
    const action = startButton.dataset.action || "start";
    if (action === "continue") {
      state.paused = false;
      overlayKicker.dataset.kind = "";
      hideOverlay();
      updateHud();
      return;
    }
    newRound(action === "next");
  });
  newGameButton.addEventListener("click", () => newRound(false));
  nextLevelButton.addEventListener("click", () => {
    state.level += 1;
    newRound(true);
  });
  pauseButton.addEventListener("click", togglePause);
  hintButton.addEventListener("click", useHint);
  shuffleButton.addEventListener("click", useShuffle);
  soundButton.addEventListener("click", () => {
    state.sound = !state.sound;
    updateHud();
  });
  document.addEventListener("contextmenu", (event) => event.preventDefault());
  document.addEventListener("selectstart", (event) => event.preventDefault());
  document.addEventListener("dragstart", (event) => event.preventDefault());
  showRulesButton.addEventListener("click", showRules);
  document.querySelectorAll('[data-menu-command="rules"]').forEach((button) => {
    button.addEventListener("click", showRules);
  });
  document.querySelectorAll("[data-option-action]").forEach((button) => {
    button.addEventListener("click", () => {
      const action = button.dataset.optionAction;
      if (action === "restart") {
        closeOptionsMenu();
        newRound(false);
      }
      if (action === "next") {
        closeOptionsMenu();
        state.level += 1;
        newRound(true);
      }
      if (action === "sound") {
        state.sound = !state.sound;
        updateHud();
      }
      if (action === "rules") showRules();
      if (action === "close") closeOptionsMenu();
    });
  });
  document.querySelectorAll(".menu-toggle, .language-toggle").forEach((button) => {
    button.addEventListener("click", (event) => {
      const portrait = window.innerHeight > window.innerWidth;
      if (button.classList.contains("mobile-pause") && portrait && state.running) {
        togglePause();
        closeMenus();
        event.stopPropagation();
        return;
      }
      if (button.classList.contains("mobile-hint") && portrait) {
        useHint();
        closeMenus();
        event.stopPropagation();
        return;
      }
      if (button.classList.contains("mobile-shuffle") && portrait) {
        useShuffle();
        closeMenus();
        event.stopPropagation();
        return;
      }
      if (button === optionsToggleButton) {
        if (optionsPanel && optionsPanel.hidden) openOptionsMenu();
        else closeOptionsMenu();
        event.stopPropagation();
        return;
      }
      const menu = document.querySelector(`#${button.dataset.menu}`);
      const opening = menu.hidden;
      closeMenus(opening ? menu : null);
      menu.hidden = !opening;
      button.classList.toggle("is-open", opening);
      event.stopPropagation();
    });
  });
  document.querySelectorAll(".menu-popover").forEach((menu) => {
    menu.addEventListener("click", (event) => {
      if (event.target.closest("button")) closeMenus();
    });
  });
  document.querySelectorAll(".difficulty").forEach((button) => {
    button.addEventListener("click", () => setDifficulty(button.dataset.difficulty));
  });
  document.querySelectorAll(".option-difficulty").forEach((button) => {
    button.addEventListener("click", () => {
      closeOptionsMenu();
      setDifficulty(button.dataset.difficulty);
    });
  });
  document.querySelectorAll(".sound-style").forEach((button) => {
    button.addEventListener("click", () => setSoundStyle(button.dataset.soundStyle));
  });
  document.querySelectorAll(".option-sound-style").forEach((button) => {
    button.addEventListener("click", () => setSoundStyle(button.dataset.soundStyle));
  });
  document.querySelectorAll(".option-language").forEach((button) => {
    button.addEventListener("click", () => setLanguagePreference(button.dataset.language));
  });
  optionsPanel?.addEventListener("click", (event) => {
    if (event.target === optionsPanel) closeOptionsMenu();
  });
  document.addEventListener("click", () => closeMenus());
  window.addEventListener("resize", () => {
    const size = chooseSize();
    if (size.rows !== state.rows || size.cols !== state.cols) {
      hideBoardUntilFit();
      clearEffects();
      state.rows = size.rows;
      state.cols = size.cols;
      buildBoard();
      render();
      return;
    }
    fitBoard();
  });

  hideBoardUntilFit();
  clearEffects();
  prepareRoundState();
  buildBoard();
  render();
  refreshStaticText();
  showOverlay(t("readyKicker"), t("readyTitle"), t("readyText"), t("start"), "start");
})();
