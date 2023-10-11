"use client";

import React, { useState, useEffect, useRef } from 'react'
import TailSegment from './TailSegment'
import Eye from './Eye'

export default function Home() {

  return (
    <div className='box relative -left-[100px] md:-left-[200px]'>
      <div className="cat mt-12 relative active:animate-[purr_1s_infinite_cubic-bezier(0,.75,1,.25)] cursor-pointer z-[10]">
        <div className="head bg-orange-400 w-[100px] h-[90px] rounded-full z-100 animate-[headBob_6s_infinite_ease-in-out]">
          <div className="ears relative -top-[20px] -z-[100]">
            <div className="ear left float-left w-0 h-0 border-l-[25px] border-r-[25px] border-b-[50px] border-l-transparent border-r-transparent border-b-orange-400 -rotate-[15deg]"></div>
            <div className="ear right float-right w-0 h-0 border-l-[25px] border-r-[25px] border-b-[50px] border-l-transparent border-r-transparent border-b-orange-400 rotate-[15deg]"></div>
          </div>
          <div className="eyes relative -top-[18px] w-[60%]">
            <Eye position='left' />
            <Eye position='right' />
          </div>
          <div className="muzzle absolute top-[60%] left-1/2 h-[6%] w-[10%] bg-white -translate-x-1/2 rounded-muzzle">
          </div>
        </div>
        <div className="body relative bg-orange-400 w-[200px] h-[120px] rounded-tl-[200px] rounded-tr-[200px] -top-[75px] left-[90px] -z-10">
          <div className="paw relative bg-orange-400 h-[30px] w-[50px] rounded-[25px] -left-[100px] top-[90px]"></div>
        </div>
        <div className="tail relative left-[180px] -top-[100px] rotate-90 z-10">
          <TailSegment>
            <TailSegment>
              <TailSegment>
                <TailSegment>
                  <TailSegment>
                    <TailSegment>
                      <TailSegment>
                        <TailSegment>
                          <TailSegment>
                            <TailSegment>
                              <TailSegment>
                                <TailSegment>
                                  <TailSegment>
                                    <TailSegment />
                                  </TailSegment>
                                </TailSegment>
                              </TailSegment>
                            </TailSegment>
                          </TailSegment>
                        </TailSegment>
                      </TailSegment>
                    </TailSegment>
                  </TailSegment>
                </TailSegment>
              </TailSegment>
            </TailSegment>
          </TailSegment>
        </div>
      </div>
    </div>
  )
}
