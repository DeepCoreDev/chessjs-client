<script>
export default {
    props: ["board-configuration", "piece-configuration", "move-piece", "valid-moves", "player-id"],
    created() {
        for (let y = 0; y < this.boardConfiguration.length; y++) {
            this.darkened[y] = [];
        }
        var vm = this;
        document.addEventListener('mousemove', function (e) {
            if (vm.selectedPiece) {
                vm.updatePiece(e);
            }
        });
    },
    methods: {
        calculateImage(x, y) {
            if (this.pieceConfiguration[y] && this.pieceConfiguration[y][x]) {
                let parts = this.pieceConfiguration[y][x].split("#");
                let pieceName = parts[0];
                let pieceColor = parts[1];
                return `/pieces/${pieceColor}/${pieceName}.svg`;
            } else {
                return "";
            }
        },
        updateDarkened() {
            for (let y = 0; y < this.boardConfiguration.length; y++) {
                this.darkened[y] = [];
            }
            for (let i = 0; i < this.validMoves.length; i++) {
                let move = this.validMoves[i];
                if (move.from[0] == this.currentlySelected[0] && move.from[1] == this.currentlySelected[1]) {
                    this.darkened[move.to[1]].push(move.to[0]);
                }
            }
        },
        mousedownPiece(e, x, y) {
            if(parseInt(this.pieceConfiguration[y][x].split("#")[1]) == this.playerId){
                this.currentlySelected = [x, y];
                this.updateDarkened();
                this.isDown = true;
                var el = document.getElementById(x + "-" + y);
                el.classList.add('grabbing');
                this.selectedPiece = el;
                this.updatePiece(e);
            }
        },
        mouseupPiece(e, x, y) {
            this.currentlySelected = [-1, -1];
            this.updateDarkened();
            this.isDown = false;

            var elements = document.elementsFromPoint(e.clientX, e.clientY);
            let div;
            for(let i = 0; i < elements.length; i++){
                if(elements[i].tagName == 'DIV'){
                    div = elements[i];
                    break;
                }
            }
            if(div){
                let m = div.id.substring("square-".length);
                let parts = m.split("-");
                let toX = parseInt(parts[0]);
                let toY = parseInt(parts[1]);
                this.makeMove({
                    fromX: x,
                    fromY: y,
                    toX: toX,
                    toY: toY
                });
            }

            this.selectedPiece.classList.remove('grabbing');
            this.selectedPiece = null;
        },
        updatePiece(e) {
            this.selectedPiece.style.left = e.clientX + "px";
            this.selectedPiece.style.top = e.clientY + "px";
        },
        makeMove(e){
            this.movePiece(e);
            this.selectedPiece.classList.remove('grabbing');
            this.selectedPiece = null;
            this.currentlySelected = [-1, -1];
            this.updateDarkened();
        }
    },
    data() {
        return {
            darkened: {},
            currentlySelected: [],
            selectedPiece: null,
            selectedListener: null,
            isDown: false,
            mouse: {
                x: 0,
                y: 0
            }
        }
    }
}
</script>

<template>
    <div :style="`display: grid; grid-template-rows: ${'min-content '.repeat(boardConfiguration.length).slice(0, -1)};`"
        class="w-min">
        <div :style="`display: grid; grid-template-columns: ${'min-content '.repeat(row.length).slice(0, -1)};`"
            v-for="(row, y) in boardConfiguration">
            <div :id="`square-${x}-${y}`" class="w-9 md:w-16 h-9 md:h-16" v-for="(square, x) in row"
                style="user-select: none;"
                :class="`${['opacity-0', 'bg-stone-200', 'bg-slate-800', 'bg-emerald-800'][square]} ${darkened[y]?.includes(x) ? 'brightness-50' : ''}`">
                <img :id="`${x}-${y}`" v-if="pieceConfiguration[y] && pieceConfiguration[y][x]"
                    :src="calculateImage(x, y)" draggable="false" class="piece w-9 md:w-16 h-9 md:h-16 z-50"
                    :onmousedown="(e) => mousedownPiece(e, x, y)" :onmouseup="(e) => mouseupPiece(e, x, y)">
            </div>
        </div>
    </div>
</template>