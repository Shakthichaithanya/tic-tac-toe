export default function GameOver ({winner, onRematch}) {
    return(
        <div id="game-over">
            <h2>Game over</h2>
            {winner && <p> you won {winner}</p>}
            {!winner && <p>It&apos;s a draw</p>}
            <p>
                <button onClick={onRematch}>Rematch</button>
            </p>
        </div>
    )
}