import React, { Component } from "react";
import MoviesTable from "./moviesTable";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import { paginate } from "../utils/paginate";
import _ from "lodash";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    sortColumn: { path: "title", order: "asc" }
  };

  componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
    this.setState({
      movies: getMovies(),
      genres
    });
  }

  handleDelete = movie => {
    this.setState({
      movies: this.state.movies.filter(currMovie => currMovie._id !== movie._id)
    });
  };

  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = genre => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  getPagedData = () => {
    const {
      selectedGenre,
      sortColumn,
      movies: allMovies,
      currentPage,
      pageSize
    } = this.state;

    const filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter(m => m.genre._id === selectedGenre._id)
        : allMovies;

    const sorted = _.orderBy(filtered, sortColumn.path, sortColumn.order);

    return paginate(sorted, currentPage, pageSize);
  };

  render() {
    const { length: count } = this.state.movies;

    const {
      currentPage,
      pageSize,
      genres,
      selectedGenre,
      sortColumn
    } = this.state;

    if (count === 0) return <p>There are no movies in the database</p>;

    const movies = this.getPagedData();

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={genres}
            onItemSelect={this.handleGenreSelect}
            selectedItem={selectedGenre}
          />
        </div>

        <div className="col">
          <p>Showing {movies.length} movies in the database.</p>

          <MoviesTable
            movies={movies}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />

          <Pagination
            itemsCount={movies.length}
            pageSize={pageSize}
            onPageChange={this.handlePageChange}
            currentPage={currentPage}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
