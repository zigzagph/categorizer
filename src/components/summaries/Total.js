import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

/*eslint no-extend-native: ["error", { "exceptions": ["Number"] }]*/
/**
 * Number.prototype.format(n, x)
 * 
 * @param integer n: length of decimal
 * @param integer x: length of sections
 */
Number.prototype.format = function(n, x) {
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
    return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
};

export default ({items}) => {
    const [charges, setCharges] = React.useState(0);
    const [adjustments, setAdjustments] = React.useState(0);

    const Charges = () => {
        const totalCharges = items.reduce((p, c) => p += Number(c.amount.replace(',', '')), 0).format(2);
        setCharges(Number(totalCharges));
        return (
            <Typography display="inline" variant="body2" style={{paddingRight: 30, color: 'red'}}>
                <strong>{totalCharges}</strong>
            </Typography>
        )
    }

    const Adjustments = () => {
        const totalAdjustments = items.reduce((p, c) => p += Number(c.adjustment.replace(',', '')), 0).format(2);
        setAdjustments(Number(totalAdjustments));
        return (
            <Typography display="inline" variant="body2" style={{paddingRight: 30}}>
                <strong>{totalAdjustments}</strong>
            </Typography>
        )
    }

    return (
        <Grid container item xs style={{marginTop: 20}} justify="flex-end" alignItems="center">
            <Grid container item justify='flex-end'>
                <Typography display="inline" variant="body1" style={{paddingRight: 20}}>
                    <strong>Total Charges :</strong>
                </Typography>
                <Charges />
            </Grid>

            <Grid container item justify='flex-end'>
                <Typography display="inline" variant="body1" style={{paddingRight: 20}}>
                    <strong>Total Adjustments :</strong>
                </Typography>
                <Adjustments />
            </Grid>

            <Grid container item justify='flex-end'>
                <Typography display="inline" variant="body1" style={{paddingRight: 20}}>
                    <strong>Grand Total :</strong>
                </Typography>
                <Typography display="inline" variant="body2" style={{paddingRight: 30, color: 'red'}}>
                    <strong>{charges + adjustments}</strong>
                </Typography>
            </Grid>
        </Grid>
    )
}
