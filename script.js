window.addEventListener("DOMContentLoaded", () => {
	const boxes = Array.from(document.querySelectorAll(".boxes"));
	const resetButton = document.querySelector(".restart");
	const playerDisplay = document.querySelector(".display-player");
	const winner = document.querySelector(".winner");
	const announcer = document.querySelector(".announcer");
	const game = document.querySelector(".game");
	const tie = document.querySelector(".tie");
	const spare = document.querySelector(".spare");

	console.log(boxes);

	let board = ["", "", "", "", "", "", "", "", ""];
	let currentPlayer = "X";
	let isGameActive = true;

	const playerXWin = "PLAYERX_WON";
	const playerOWin = "PLAYERO_WON";
	const TIE = "TIE";

	/* 
	[0] [1] [2]
	[3] [4] [5]
	[6] [7] [8]
	*/

	const winningConditions = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];

	function handleResultValidation() {
		let roundWon = false;
		for (let i = 0; i <= 7; i++) {
			const winCondition = winningConditions[i];
			const a = board[winCondition[0]];
			const b = board[winCondition[1]];
			const c = board[winCondition[2]];
			if (a === "" || b === "" || c === "") {
				continue;
			}
			if (a === b && b === c) {
				roundWon = true;
				break;
			}
		}

		if (roundWon) {
			announce(currentPlayer === "X" ? playerXWin : playerOWin);
			isGameActive = false;
			game.classList.add("hidden");
			announcer.classList.remove("hidden");
			return;
		}

		if (!board.includes("")) announce(TIE);
	}

	const announce = (type) => {
		switch (type) {
			case playerOWin:
				winner.textContent = "O";
				break;
			case playerXWin:
				winner.textContent = "X";
				break;
			case TIE:
				tie.classList.remove("hidden");
				spare.classList.add("hidden");
				announcer.classList.remove("hidden");
				game.classList.add("hidden");
		}
	};

	const changePlayer = () => {
		playerDisplay.classList.remove(`player${currentPlayer}`);
		currentPlayer = currentPlayer === "X" ? "O" : "X";
		playerDisplay.innerText = currentPlayer;
		playerDisplay.classList.add(`player${currentPlayer}`);
	};

	const userAction = (box, index) => {
		if (isValidAction(box) && isGameActive) {
			box.innerText = currentPlayer;
			box.classList.add(`player${currentPlayer}`);
			updateBoard(index);
			handleResultValidation();
			changePlayer();
		}
	};

	boxes.forEach((box, index) => {
		box.addEventListener("click", () => userAction(box, index));
	});

	const isValidAction = (box) => {
		if (box.innerText === "X" || box.innerText === "O") {
			return false;
		}

		return true;
	};

	const updateBoard = (index) => {
		board[index] = currentPlayer;
	};

	const resetBoard = () => {
		announcer.classList.add("hidden");
		game.classList.remove("hidden");
		board = ["", "", "", "", "", "", "", "", ""];
		isGameActive = true;
		tie.classList.add("hidden");
		spare.classList.remove("hidden");

		if (currentPlayer === "O") {
			changePlayer();
		}

		boxes.forEach((box) => {
			box.innerText = "";
			box.classList.remove("playerX");
			box.classList.remove("playerO");
		});
	};

	resetButton.addEventListener("click", resetBoard);
});
