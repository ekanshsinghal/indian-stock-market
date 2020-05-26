export const getTreeMapObj = (scripts, variation) => {
    let children = [];
    switch(variation) {
        case 'currVal': 
            scripts.map(item => {
                const price = item.nse ? item.nse.price : item.bse.price;
                return children.push({name: item.name, loc: Math.round(item.netPos * price)})
            })
            return {name: 'Current Value', children};
        case 'invVal':
            scripts.map(item => {
                return children.push({name: item.name, loc: Math.round(item.netPos * item.avg_price)})
            })
            return {name: 'Investment Value', children};
        case 'pl':
            scripts.map(item => {
                const price = item.nse ? item.nse.price : item.bse.price;
                return children.push({name: item.name, loc: Math.abs(Math.round(item.netPos * (price - item.avg_price)))})
            })
            return {name: 'P&L', children};
        default: return null;
    }
}