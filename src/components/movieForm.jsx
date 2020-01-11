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
        title: Joi.string()
            .required()
            .label("Title"),
        genre: Joi.string()
            .required()
            .label("Genre"),
        numberInStock: Joi.number()
            .min(0)
            .required()
            .label("Number in Stock"),
        dailyRentalRate: Joi.number()
            .min(0)
            .max(10)
            .required()
            .label("Rate")
    };

    componentDidMount() {
        this.setState({
            genres: getGenres()
        });

        const movieId = this.props.match.params.id;
        if (movieId === "new") return;

        const movie = getMovie(movieId);
        if (!movie) return this.props.history.replace("/not-found");

        this.setState({ data: this.mapToViewModel(movie) });
    }

    doSubmit() {
        // Upsert the movie

        console.log("Movie saved");
        const { history } = this.props;
        history.push("/movies");
    }

    mapToViewModel(movie) {
        return {
            _id: movie._id,
            title: movie.title,
            genre: movie.genre._id,
            numberInStock: movie.numberInStock,
            dailyRentalRate: movie.dailyRentalRate
        };
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
