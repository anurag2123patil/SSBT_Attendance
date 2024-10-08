// export default App;
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DepartmentSelection from './myscreen/DepartmentSelection';
import YearSelection from './myscreen/YearSelection';
import SubjectSelectionTEB from './myscreen/TEB/SubjectSelectionTEB';
import GenerateQRDBMSB from './myscreen/TEB/GenerateQRDBMSB';
import GenerateQRFLATB from './myscreen/TEB/GenerateQRFLATB';
import SubjectSelection from './myscreen/SubjectSelection';
import SectionSelection from './myscreen/SectionSelection';
import GenerateQRDBMSA from './myscreen/TEA/GenerateQRDBMSA';
import GenerateQRFLATA from './myscreen/TEA/GenerateQRFLATA';
import SubjectSelectionTEA from './myscreen/TEA/SubjectSelectionTEA';
import SoftWareA from './myscreen/TEA/SoftWareA';
import SoftWareB from './myscreen/TEB/SoftWareB';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DepartmentSelection />} />
        <Route path="/computer/year1" element={<YearSelection />} />


        <Route path="/computer/year1/sectionSE" element={<SectionSelection />} />


        <Route path="/computer/year1/sectionTE" element={<SectionSelection />} />

        <Route path="/computer/year1/sectionTE/TEA" element={<SubjectSelectionTEA />} />
        <Route path="/computer/year1/sectionTE/TEA/DBMSA" element={<GenerateQRDBMSA />} />
        <Route path="/computer/year1/sectionTE/TEA/FLATA" element={<GenerateQRFLATA />} />
        <Route path="/computer/year1/sectionTE/TEA/SoftWareA" element={<SoftWareA />} />


        <Route path="/computer/year1/sectionTE/TEB" element={<SubjectSelectionTEB />} />
        <Route path="/computer/year1/sectionTE/TEB/DBMSB" element={<GenerateQRDBMSB />} />
        <Route path="/computer/year1/sectionTE/TEB/FLATB" element={<GenerateQRFLATB />} />
        <Route path="/computer/year1/sectionTE/TEB/SoftWareB" element={<SoftWareB />} />


        <Route path="/computer/year1/sectionTE/TEC" element={<SubjectSelection />} />


        <Route path="/computer/year1/sectionBE" element={<SectionSelection />} />


        <Route path="/computer/yearTE" element={<YearSelection />} />
        <Route path="/computer/yearBE" element={<YearSelection />} />
        <Route path="/mechenical/year2" element={<YearSelection />} />
        <Route path="/etc/year3" element={<YearSelection />} />
        <Route path="/electrical/year4" element={<YearSelection />} />
        <Route path="/civil/year5" element={<YearSelection />} />
      </Routes>
    </Router>
  );
}

export default App;

