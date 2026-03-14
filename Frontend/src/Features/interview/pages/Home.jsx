import React from 'react'

const Home = () => {
    return (
        <div>
            <div className=''>
                <textarea name="jobDescription" id="" placeholder='Enter job description'></textarea>
            </div>
            <div className=''>
                <div>
                    <label htmlFor="resume">Upload Resume</label>
                    <input type="file" name="resume" id="resume" accept=".pdf,.doc,.docx" />
                </div>
                <div>
                    <label htmlFor="selfDescription"> Self Description</label>
                    <textarea name="selfDescription" id="selfDescription"></textarea>
                </div>
                <button className='generate-btn'>Generate Interview Report</button>
            </div>
            <div></div>
        </div>
    )
}
export default Home