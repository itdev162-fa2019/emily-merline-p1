import React from 'react';
import './App.css';
import axios from 'axios';


class App extends React.Component {

  constructor(props) {
    super(props);
    this.wordFreq = this.wordFreq.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }    
  
  state = {
    ignores: [],
    words: "",
    wordmap: {},
    arraymap: [],
    igWord: ""
  };


  componentDidMount() {
    axios.get('http://localhost:5000/api/ignores')
    .then((response) => {
      this.setState({
        ignores: response.data
      })
    })

    .catch((error) => {
      console.error(`Error fetching data: ${error}`);
    })
  }

  //wordmap: this.state.words.replace(/[.]/g,'')
  wordFreq() {
    this.setState({ 
      wordmap: this.state.words.replace(/[,.!)(?]/g,'')
      .split(/\s/)
      .reduce((map, word) =>
      Object.assign(map, {
        [word.toLowerCase()]: (map[word])
        ? map[word] + 1
        : 1,
      }),
      {}
      )
    })
    let newOrder = [];
    
    const { wordmap } = this.state;

    Object.entries(wordmap).map(([key,value])=>
      newOrder.push([key,value])
    )

    function sortFunction(a, b) {
      if (a[1] === b[1]) {
          return 0;
      }
      else {
          return (a[1] < b[1]) ? 1 : -1;
      }
    }

    newOrder.sort(sortFunction);
    
    this.setState({ 
        arraymap: newOrder,
    })

    axios.get('http://localhost:5000/api/ignores')
    .then((response) => {
      this.setState({
        ignores: response.data
      })
    })

    .catch((error) => {
      console.error(`Error fetching data: ${error}`);
    })

  }

  handleInputChange(event){
    this.setState({ 
      igWord: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault();

    const { igWord } = this.state;

    axios.post(`http://localhost:5000/api/ignores`, { igWord })
    .then(res => {
      console.log(res);
      console.log(res.data);
    })
  }


  handleChange(event) {
    this.setState({
      words: event.target.value,
    });
  }


  render() {

    const { ignores } = this.state;
    
    let ignoreList = [];
    
    ignores.map((ignore: any) => 
      ignoreList.push(ignore.igWord)
    )

    const { arraymap } = this.state;

    const list = arraymap.filter((elem)=> !ignoreList.includes(elem[0].toLowerCase()) && elem[1] > 1 && elem[0] !== "")
    .map((elem)=>{
        return (
          <tr key={elem[0]}>
            <td>{elem[0]}</td>
            <td>{elem[1].toString()}</td>
          </tr>
      );
    })

    return (
      <div className="App">
        <header className="App-header">
          The Write Help
        </header>
        <main>
          <div className="write-div">
          <textarea className="write-area" onChange={this.handleChange}>
            </textarea>
          </div>
          <div className="freq-list">
          <button className="count-freq" onClick={this.wordFreq}>Calculate Frequency</button>
          </div>
          <div className="word-add">
          <form className="app-form" onSubmit={this.handleSubmit}>
              <label>Add Ignored Words</label>
              <input type="text" value={this.state.igWord} onChange={this.handleInputChange} />
              <input type="submit" value="Submit" className="submit-button"/>
          </form>
          </div>
          <table className="freq-table">
            <thead>
              <tr>
                <th>Word</th>
                <th>Count</th>
              </tr>
            </thead>
            <tbody>
            {list}
            </tbody>
          </table>

        </main>
      </div>
    )
  }
}

export default App;
