#!/bin/bash

rm -r neo-jmeter-tests/Logs
mkdir neo-jmeter-tests/Logs 
# current_time=$(date "+%Y.%m.%d-%H.%M.%S")

# ./jmeter -n -t neo-jmeter-tests/TestPlans/sample-test-plan.jmx -l neo-jmeter-tests/Logs/samplelog-'yyyyMMddHHmmss'.csv -e -o neo-jmeter-tests/ReportsDashboard
./jmeter -n -t neo-jmeter-tests/TestPlans/sample-test-plan.jmx -l neo-jmeter-tests/Logs/samplelog.csv

./jmeter -n -t neo-jmeter-tests/TestPlans/landing-route.jmx -l neo-jmeter-tests/Logs/landing-log.csv

./jmeter -n -t neo-jmeter-tests/TestPlans/history-route.jmx -l neo-jmeter-tests/Logs/history-log.csv

./jmeter -n -t neo-jmeter-tests/TestPlans/widget-route.jmx -l neo-jmeter-tests/Logs/widget-log.csv

./jmeter -n -t neo-jmeter-tests/TestPlans/metadata-route.jmx -l neo-jmeter-tests/Logs/metadata-log.csv

./jmeter -n -t neo-jmeter-tests/TestPlans/login-route.jmx -l neo-jmeter-tests/Logs/login-log.csv