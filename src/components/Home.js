import React from 'react';
import axios from 'axios';

export default class Home extends React.Component{
    constructor(props){
        super(props)
        
        this.state = {
            category:[],
            content:[],
            result:false
        }

        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        axios.get('https://api.chucknorris.io/jokes/categories')
            .then(response => { this.setState({ category: response.data }) })
            .catch(() => { console.log('Erro ao recuperar os dados'); });
    }

    handleClick(e){
        e.preventDefault();

        let getCategory = e.target.getAttribute('data-id');
        
        axios.get('https://api.chucknorris.io/jokes/random?category='+getCategory)
        .then(response => { 
            this.setState({ 
                result:true,
                content:response.data
            });
        })
        .catch(() => { console.log('Erro ao recuperar os dados'); });
    }
    
    render(){

        let content = [];

        if( this.state.result ) {
            for( let item in this.state.content ) {
                content.push(item)
            }
        }
        let showContent = (
            <div className="col-xs-8 col-sm-6 col-md-12 pull-right">
                <div className="controller">
                    <img src={this.state.content['icon_url']} />
                    <blockquote>
                        <p>{ this.state.content['value'] }</p>
                    </blockquote>
                    <pre>
                        <code className="response">
                            &#123;<br />
                                { content.map((item, idx) => { 
                                    return (
                                        <div key={idx}><span>"{ item }" : "{ this.state.content[item] }",</span><br /></div>
                                    )
                                })}
                            &#125;<br />
                        </code>
                    </pre>
                </div>
            </div>
        )

        return(
            <section id="hero">
                    <div className="col-xs-4 col-sm-6 col-md-12 pull-left">
                        <ul>
                            { this.state.category.map((item, idx) =>
                                <li key={idx} data-id={item} onClick={this.handleClick}>
                                    {item}
                                </li>
                            )}
                        </ul>
                    </div>

                    { this.state.result ? showContent : '' }

            </section>
        )
    }
}