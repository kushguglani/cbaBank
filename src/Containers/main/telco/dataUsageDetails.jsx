import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Doughnut, Bar } from 'react-chartjs-2';

class DataUsageDetails extends Component {
    render() {
        const applicationUsageData = this.props.applicationUsage;
        let labelApplication = Object.keys(applicationUsageData);

        let labelData = labelApplication.map(curr => {
            return curr.charAt(0).toUpperCase() + curr.slice(1);
        })

        console.log(labelData)
        let data = {
            datasets: [{
                data: Object.values(applicationUsageData),
                backgroundColor: ['#f95201 ', '#ffcc00 ', '#8042a5 ', '#293f70 ', '#4751cc ', '#4fc6e8 ', '#fc427b ', '#016e76 '],
                hoverBackgroundColor: ['#b53b01 ', '#cca300 ', '#6d388d ', '#203157 ', '#343fbd ', '#22b7e2 ', '#fb2164 ', '#015e65 ']
            }],
            labels: labelData
        };
        let dataOptions = {
            text: "String",
            responsive: true,
            maintainAspectRatio: false,
            cutoutPercentage: 60,
            legend: {
                position: 'right',
                labels: {
                    text: 'Desktop',
                    padding: 13,
                    boxWidth: 18,
                    boxHeight: 18
                }
            },

        }
        let dataConsumed = {
            datasets: [{
                data: [this.props.UsageData, this.props.totalData - this.props.UsageData],

                backgroundColor: ['#36a2eb', '#e3e8ec'],
            }],
            labels: ["Consumed", "Remaining"]
        };
        let dataConsumedOptions = {
            legend: {
                display: false,
            },
            rotation: 1 * Math.PI,
            circumference: 1 * Math.PI,
            // percentageInnerCutout: 40
            cutoutPercentage: 80,

            responsive: false,
            maintainAspectRatio: true,
        }

        const dailyUsageData = this.props.dailyUsage;
        let options = {
            // scales: {
            //     xAxes: [{
            //         display:false,
            //         gridLines: {
            //             offsetGridLines: false
            //         }
            //     }]
            // },
            // responsive: false,
            // maintainAspectRatio: true,
            legend: {
                display: false,
            },
            scales: {
                xAxes: [{
                    gridLines: {
                        display: false
                    }
                }],
                yAxes: [{
                    gridLines: {
                        display: false
                    }
                }]
            }
            // scales: {
            //     yAxes: [{
            //         ticks: {
            //             beginAtZero:true
            //         }
            //     }]
            // }
        }
        let barData = {
            datasets: [{
                label: 'Daily Usage In MB',
                data: Object.values(dailyUsageData).map(curr => {
                    console.log(dailyUsageData.length);
                    // let usage = curr.dataUsage +" Mb"
                    // console.log(usage);
                    return curr.dataUsage;
                }),
                backgroundColor: Object.values(dailyUsageData).map((curr1, i) => {
                    if (dailyUsageData.length - 1 === i) {
                        return "#18bbff";
                    }
                    else {
                        return "#e3e8ec";
                    }

                })
            }],

            labels: Object.values(dailyUsageData).map(curr => {
                // console.log(curr.date);
                let day = curr.date.split("/")
                return day[0]
            }),
            options: options
        };
        return (
            <React.Fragment>
                <div className="halfGrpah ">
                    <p>Data Usage by Application</p>
                    <div className="chart-container">
                        <Doughnut ref='chart' data={data} options={dataOptions} />
                    </div>
                    <div className="donut-inner">
                        <h5>Data Usage</h5>
                    </div>
                </div>
                <div className="halfGrpah clearfix">
                    <p className="belowMargin">Data Consumed</p>
                    <ul className="usagedata">
                        <li className="uslist">Usage Charges</li>
                        <span>| </span>
                        <li className="uslist" id="use"> Usage</li>
                    </ul>
                    <div className="dataConsumedAlign">
                        <Doughnut ref='chart' data={dataConsumed} options={dataConsumedOptions} className="dataConsumedAlign" />

                    </div>

                    <div className="donut-below-half">
                        <p>01 Sep <span className="daysLeft" >10 days to go </span>   30 Sep</p>
                    </div>
                    <div className="donut-inner-half">
                        <p>Data Used</p>
                        <h5>{Math.round((this.props.totalData / 1024) * 100) + " GB"}</h5>
                    </div>
                    <div>
                        <ul className="Weekdata">
                            <li className="weekdatalist"><p>$ 123</p><label>Previous Week</label><span className="verLinedata"></span></li>
                            <li className="weekdatalist"><p>$ 123</p><label>This Week</label><span className="verLinedata"></span></li>
                            <li className="weekdatalist"><i className="fa fa-arrow-up"></i><p > $ 123</p><label>Difference</label></li>
                        </ul>
                    </div>
                </div>
                <div className="fullGrpah clearfix">
                    <p>Detailed Usage </p>
                    <div className="monthlynavbar">
                        <ul className="datedata">
                            <li className="datelist">Week</li>
                            <li className="datelist" id="month"> Month</li>
                            <li className="datelist"> Year</li>
                        </ul>
                    </div>
                    <div className="yAxisText" >
                        <p>Data Consumption (MB)</p>
                    </div>

                    <div className="xAxisText" >
                        <p>September 2018</p>
                    </div>
                    <div className="chart-container-bar">
                        <Bar className="barChart" ref='chart' options={options} data={barData} />
                    </div>
                </div>
            </React.Fragment>
        );
    }
}


function initMapStateToProps(state) {
    console.log(state);
    return {
        productName: state.storedState.productName,
        applicationUsage: state.storedState.telco.dashboard.usageServices[0].usageProducts[0].usage.applicationUsage,
        dailyUsage: state.storedState.telco.dashboard.usageServices[0].usageProducts[0].usage.dailyUsage,
        totalData: state.storedState.telco.dashboard.usageServices[0].usageProducts[0].usage.allocatedData,
        UsageData: state.storedState.telco.dashboard.usageServices[0].usageProducts[0].usage.dataUsage


    }
}
export default connect(initMapStateToProps)(DataUsageDetails);