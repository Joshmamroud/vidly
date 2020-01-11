import React from "react";
import Form from "./common/form";
import { getMovie } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Joi from "joi-browser";

class MovieForm extends Form {
  state = {
    data: { title: "", genre: "", numberInStock: "", dailyRentalRate: "" },
    errors: {},
    genres: []
  };

  schema = {
    title: Joi.string().required(),
    genre: Joi.string().required(),
    numberInStock: Joi.number()
      .min(0)
      .required(),
    dailyRentalRate: Joi.number()
      .min(0)
      .max(10)
      .required()
  };

  componentDidMount() {
    this.setState({
      genres: getGenres()
    });

    const id = this.props.match.params.id;
    const data = getMovie(id);
    if (data) this.setState({ data });
  }

  doSubmit() {
    // Upsert the movie

    console.log("Movie saved");
    const { history } = this.props;
    history.push("/movies");
  }

  render() {
    const { genres } = this.state;
    return (
      <div>
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelect("genre", "Genre", genres)}
          {this.renderInput("numberInStock", "Number In Stock")}
          {this.renderInput("dailyRentalRate", "Rate")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default MovieForm;
