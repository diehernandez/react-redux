import classnames from 'classnames';

function Button({
    children,
    primary,
    secondary,
    success,
    warning,
    danger,
    outline,
    rounded
}) {
    const classes = classnames('px-3 py-1.5', {
        'border-blue-500 bg-blue-500 text-white': primary,
        'border-gray-900 bg-gray-900 text-white': secondary,
        'border-green-500 bg-green-500 text-white': success,
        'border-yellow-400 bg-yellow-400 text-white': warning,
        'border-red-500 bg-red-500 text-white': danger,
    })
    return <button className={classes}>{children}</button>
}
Button.propTypes = {
    checkVariationValues: ({ primary,
        secondary,
        success,
        warning,
        danger,}) => {
        const count = Number(!!primary) + Number(!!secondary) + Number(!!success)+ Number(!!warning) + Number(!!danger);

        if (count > 1) {
            throw new Error( 'Only one of types can be true');
        }
    }
}
export default Button;