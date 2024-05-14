#! /bin/bash

preBuild() {
    printf "\n"
    printf "*******************************************************\n"
    printf "* WARNING:                                            *\n"
    printf "*******************************************************\n"
    printf "* This builder will only run webpack!                 *\n"
    printf "*                                                     *\n"
    printf "* This builder DOES NOT:                              *\n"
    printf "*   - Clean the node_modules folder                   *\n"
    printf "*   - Clean the webpack output folder.                *\n"
    printf "*   - Does not install or update npm dependencies     *\n"
    printf "*   - Does not apply security audit patches.          *\n"
    printf "*******************************************************\n"
}

build() {
    printf "\n"
    printf "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n"
    printf "| Running webpack ...                                 |\n"
    printf "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n"
    npm run pack
}

postBuild() {
    printf "\n"
    printf "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n"
    printf "| EzClocker NPM Quick Build is Complete               |\n "
    printf "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n"
    printf "\n"
}

runScript() {
    printf "\n"
    printf "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n"
    printf "| EzClocker Quick NPM Build                         |\n"
    printf "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n"

    preBuild

    build

    postBuild
}

runScript
