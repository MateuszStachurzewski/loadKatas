# Introduction

Welcome to Load Testing Katas. You may have heard about coding katas. 
Those are small coding challenges that help you learn tools and improve 
your thinking skills. 

Exposure to performance testing is generally rare. Either you don't have
an opportunity to run load tests or you do it only once in a while. This
doesn't give you enough chance to hone your skills.

Load Testing Katas is a set of challenges that should give you a context and purpose
to play with load testing tools and practice your perf testing skills.
This repository will gather two main things:
- an API that you can use to run your load tests against
- a set of challenges with solutions

## Challenges
The challenges will be organized their main purpose:
- performance focused are those challenges where you will focus on running the scripts in various configuration to 
identify hidden issues
- user journey focused are challenges where you need to figure out how to recreate specific journeys
that users tend to follow when exploring applications.

Each challenge will have a description and solution. The solution
will be provided for three tools:
- jmeter
- k6
- locust
You can either pick your favourite tool or play with all of the tools.
It is recommended to play with all the tools - you can come to interesting conclusions when you try to
solve same kata using different tools.

## Before you start
1. Install one (or all) of the tools that you are going to use:
   1. Jmeter https://octoperf.com/blog/2017/10/26/how-to-install-jmeter-mac/
   2. k6 https://k6.io/docs/getting-started/installation/
   3. https://docs.locust.io/en/stable/installation.html

Also, take a look at `/loadKatasApp/README.md` - there's a section describing some support provided for the tools.