import React from 'react';
import Paper from '@material-ui/core/Paper';
import Heading from './Heading';
import Header from './Header';
import LineItem from './LineItem';
import Total from './Total';

const styles = {
    paper: {
        padding: 30,
        margin: "40px 0px 40px 0px",
    }
}

export default ({mande, period}) => {
    const Deduction = () => {
        return (
            <Paper style={styles.paper}>
                <Heading period={period} title="Meals & Entertainment Summary"/>
                <Header />
                { mande.map((item, i) => <LineItem item={item} key={i}/>) }
                <Total items={mande}/>
            </Paper>
        )
    }
    return <div>{ mande.length > 0 ? <Deduction/> : null }</div>
}
