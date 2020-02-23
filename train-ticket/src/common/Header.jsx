import React from 'react';
import PropTypes from 'prop-types';
import './Header.css';
export default function Header(props) {
    const { onBack, title } = props;

    return <div className="header-back">111</div>;
}
Header.propTypes = {
    onBack: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
};
