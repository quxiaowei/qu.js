#!/usr/bin/env node --no-warnings=ExperimentalWarning

import info from "../package.json" with {type: "json"}
import { qcalcVersion, qcalcAction } from "../src/qcalc.js"
import { program } from "commander"

program.name("qu.js")
    .description("a CLI tool created by qu")
    .version(info.version, "-v --version").usage("<command> [options]")

program.command("hi")
    .description("say hello & test")
    .argument("[name]", "to whom I say hello", "world")
    .action((name) => {
        console.log(`Hello ${name}!`)
    })

program.command("calc")
    .description(`${qcalcVersion} a simple calculator.`)
    .argument("[input]", "string to calculate, wrapped by quots for complex expression. \nexample: \"1 + 2 + sum( max( 1, 2))\"")
    .option('-i --interactive', "interactive mode")
    .action(qcalcAction)

program.parse(process.argv)

