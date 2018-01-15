import React from 'react';
import axios from 'axios';

export default class Home extends React.Component{
    constructor(props){
        super(props)
        
        this.state = {
            category:[],
            icon_url:'',
            id:'',
            url:'',
            value:'',
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
                icon_url:response.data.icon_url,
                id:response.data.id,
                url:response.data.url,
                value:response.data.value,
                result:true 
            });
        })
        .catch(() => { console.log('Erro ao recuperar os dados'); });
    }
    
    render(){
        
        let showContent = (
            <div className="col-xs-8 col-sm-6 col-md-12 pull-right">
                <div className="controller">
                    <img src={this.state.icon_url} />
                    <blockquote>
                        <p>{ this.state.value }</p>
                    </blockquote>
                    <pre>
                        <code className="response">
                            &#123;<br />
                                <span>"icon_url" : "{ this.state.icon_url }",</span><br />
                                <span>"id" : "{ this.state.id }",</span><br />
                                <span>"url" : "{ this.state.url }",</span><br />
                                <span>"value" : "{ this.state.value }"</span><br />
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