#!/usr/bin/env node --no-warnings=ExperimentalWarning

// console.log("hello world!")

import { program } from "commander"
import info from "../package.json" with {type: "json"}

import { spawn, execSync } from "child_process"

program.name("qu.js")
    .description("a CLI tool created by qu")
    .version(info.version, "-v --version").usage("<command> [options]")

program.command("hi")
    .description("say hello & test")
    .argument("[name]", "to whom I say hello", "world")
    .action((name) => {
        console.log(`Hello ${name}!`)
    })


function spawn_qcalc(input, options) {
    let args = []
    args = options.interactive ? ["-i"] : [input]
    // console.log(args)

    let qcalcProcess

    if (options.interactive) {
        qcalcProcess = spawn("qcalc", args, { stdio: 'inherit' })
    } else {
        qcalcProcess = spawn("qcalc", args)

        qcalcProcess.stdout.on("data", (data) => {
            console.log(data.toString())
        })

        qcalcProcess.stderr.on('data', (data) => {
            console.log("error: check your input")
        });
    }
}


function get_qcalc_option(input) {
    let result = execSync(`qcalc ${input}`)
    return result
}


let qcalcVersion = get_qcalc_option("-v")
// console.log(qcalcVersion)

program.command("calc")
    .description(`${qcalcVersion} a simple calculator.`)
    .option('-i --interactive', "interactive mode")
    .argument("[input]", "string to calculate, wrapped by quots for complex expression. \nexample: \"1 + 2 + sum( max( 1, 2))\"")
    .action(spawn_qcalc)
// .action()


program.parse(process.argv)

