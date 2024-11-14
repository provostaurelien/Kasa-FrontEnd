import PropTypes from 'prop-types';

function Card({ title, cover }) {
  return (
    <div className="card">
      <h2>{title}</h2>
      <img src={cover} alt={title} />
    </div>
  );
}

Card.propTypes = {
    title: PropTypes.string.isRequired,
    cover: PropTypes.string.isRequired,
  };

export default Card;