const client = require('prom-client');

class Prometheus  {
    constructor(gateway, jobName, label, product) {
        this.gateway = new client.Pushgateway(gateway, { timeout: 5000 }); 
        this.jobName = jobName;
        this.gauge = new client.Gauge({ name: jobName, product: product, help: label });
        this.product = product;
        this.label = label;
    }
    push(start)  {
        const end = new Date();
        const timeProcess = end - start;        
        this.gauge.set(timeProcess, (new Date()).getTime());
        this.gateway.pushAdd({ jobName: this.jobName, groupings: { time: timeProcess, product: this.product } }, function(err, resp, body) {});
    }

};


module.exports = Prometheus;
