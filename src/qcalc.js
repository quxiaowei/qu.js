import { spawn, execSync } from "child_process"

const decoder = new TextDecoder("utf-8")

export function qcalcAction(input, options) {
    let args = []
    args = options.interactive ? ["-i"] : [input]

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
        })
    }
}

function getQcalcOption(input) {
    let result = execSync(`qcalc ${input}`)
    result = decoder.decode(result)
    if (result.trim) {
        result = result.trim()
    }
    return result
}

export const qcalcVersion = getQcalcOption("-v")
