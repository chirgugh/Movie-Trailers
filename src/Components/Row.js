import React, { Component } from 'react'
import axios from 'axios';
import  './Row.css'
import Youtube from 'react-youtube'



/////material 
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';


let image_base_url="http://image.tmdb.org/t/p/original"
let opts={
   playerVars:{
       autoplay:1
   }
}
export default class Row extends Component {

    constructor(props) {
        super(props);
        this.state = {
          title :"dfdfdfd",
          movies :[],
          open: false,
          trailer: "",
        }
      }
      componentDidMount() {
        
        this.setState({ title: this.props.title });
        
        axios.get(this.props.url)
        .then(response => {
          this.setState({ movies: response.data.results });
          
        })
        .catch(error => {
              console.log(error);
        });
        
         console.log( this.state.movies)
      }

       handleClickOpen = (id) => {
           console.log(id)

           axios.get("https://api.themoviedb.org/3/movie/"+id+"/videos?api_key={API_KEY}")
        .then(response => {
              //console.log(response.data.results[0].key)

              if (response.data.results.length  <1) {
                           this.setState({ open: true });
              }
              else{
                           this.setState({ trailer: response.data.results[0].key, open: true  });
                          
              }

            //   this.setState({ trailer: response.data.results[0].key  });
            //   this.setState({ open: true });
          
        })
        .catch(error => {
              console.log(error);
        });

        
        // this.setState({ open: true });
      };
    
       handleClose = () => {
        this.setState({ trailer: ""  });
        this.setState({ open: false });
      };
    

     


    render() {
        return (
            <div>
                   <h1 className="title">{ this.state.title}</h1>
                   <div  className="movie_posters">
                        { this.state.movies.map(movie =>(
                                    <img onClick={() => this.handleClickOpen(movie.id)}
                                    className="posters" src={`${image_base_url}${movie.poster_path}`} alt={movie.original_title} key={movie.id} />
                        ))}
                   </div>
                   { 
                    this.state.open && this.state.trailer!="" ?
                
                        <Dialog
                        open={this.state.open}
                        onClose={()=> this.handleClose()}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        className="dialog"
                      >
                        <DialogContent>
                          <DialogContentText id="alert-dialog-description">
                          <Youtube className="video" videoId={this.state.trailer} opts={opts} />
                          </DialogContentText>
                        </DialogContent>
                      </Dialog>
                    :
                    <Dialog
                        open={this.state.open}
                        onClose={()=> this.handleClose()}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        className="dialog"
                      >
                        <DialogContent>
                          <DialogContentText id="alert-dialog-description">
                                 <h1>Sorry, theres no trailer for this movie</h1>
                          </DialogContentText>
                        </DialogContent>
                      </Dialog>

                   }
            
                  
            </div>
        )
    }
}
