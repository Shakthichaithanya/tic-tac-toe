import Players from "./components/Players"

function App() {
  
  return (
    
    <main id="game-container">
      <ol id="players">
        <Players playerName="Player 1" playerSymbol="X"/>
        <Players playerName="Player 2" playerSymbol="O"/>
      </ol>
    </main>
  )
}

export default App
