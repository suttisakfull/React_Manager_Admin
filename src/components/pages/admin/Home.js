import React from 'react'

import Header from '../../layouts/adminlte/Header'
import MenubarAdmin from '../../layouts/adminlte/MenubarAdmin';
import Footer from '../../layouts/adminlte/Footer'
import 'bootstrap/dist/css/bootstrap.min.css';



const home = () => {
  return (
    <div>
      <Header />
      <MenubarAdmin />
      <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0"> Dashboard:</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item"><span>Home</span></li>
                  <li className="breadcrumb-item active">Dashboard v1</li>
                </ol>
              </div>
            </div>
            <hr></hr>
            {/* ====================================== */}
            <div class="col-md-12">
              <div class="card">
                <div class="card-header">
                  <h3 class="card-title">Bordered Table</h3>
                </div>

                <div class="card-body">
                  <table class="table table-bordered">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Task</th>
                        <th>Progress</th>
                        <th >Label</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1.</td>
                        <td>Update software</td>
                        <td>
                          <div class="progress progress-xs">
                            <div class="progress-bar progress-bar-danger" ></div>
                          </div>
                        </td>
                        <td><span class="badge bg-danger">55%</span></td>
                      </tr>
                      <tr>
                        <td>2.</td>
                        <td>Clean database</td>
                        <td>
                          <div class="progress progress-xs">
                            <div class="progress-bar bg-warning" ></div>
                          </div>
                        </td>
                        <td><span class="badge bg-warning">70%</span></td>
                      </tr>
                      <tr>
                        <td>3.</td>
                        <td>Cron job running</td>
                        <td>
                          <div class="progress progress-xs progress-striped active">
                            <div class="progress-bar bg-primary" ></div>
                          </div>
                        </td>
                        <td><span class="badge bg-primary">30%</span></td>
                      </tr>
                      <tr>
                        <td>4.</td>
                        <td>Fix and squish bugs</td>
                        <td>
                          <div class="progress progress-xs progress-striped active">
                            <div class="progress-bar bg-success" ></div>
                          </div>
                        </td>
                        <td><span class="badge bg-success">90%</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* <div class="card-footer clearfix">
                  <ul class="pagination pagination-sm m-0 float-right">
                    <li class="page-item"><a class="page-link" href="#">&laquo;</a></li>
                    <li class="page-item"><a class="page-link" href="#">1</a></li>
                    <li class="page-item"><a class="page-link" href="#">2</a></li>
                    <li class="page-item"><a class="page-link" href="#">3</a></li>
                    <li class="page-item"><a class="page-link" href="#">&raquo;</a></li>
                  </ul>
                </div> */}
              </div>


             
            </div>

            {/* ===================================== */}
            {/* <div className="col-md-12">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Simple Full Width Table</h3>
                  <div className="card-tools">
                    <ul className="pagination pagination-sm float-right">
                      <li className="page-item"><a className="page-link" href="#">«</a></li>
                      <li className="page-item"><a className="page-link" href="#">1</a></li>
                      <li className="page-item"><a className="page-link" href="#">2</a></li>
                      <li className="page-item"><a className="page-link" href="#">3</a></li>
                      <li className="page-item"><a className="page-link" href="#">»</a></li>
                    </ul>
                  </div>
                </div>
                <div className="card-body p-0">
                  <table className="table">
                    <thead>
                      <tr>
                        <th style={{ width: 10 }}>#</th>
                        <th>Task</th>
                        <th>Progress</th>
                        <th style={{ width: 40 }}>Label</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1.</td>
                        <td>Update software</td>
                        <td>
                          <div className="progress progress-xs">
                            <div className="progress-bar progress-bar-danger" style={{ width: '55%' }} />
                          </div>
                        </td>
                        <td><span className="badge bg-danger">55%</span></td>
                      </tr>
                      <tr>
                        <td>2.</td>
                        <td>Clean database</td>
                        <td>
                          <div className="progress progress-xs">
                            <div className="progress-bar bg-warning" style={{ width: '70%' }} />
                          </div>
                        </td>
                        <td><span className="badge bg-warning">70%</span></td>
                      </tr>
                      <tr>
                        <td>3.</td>
                        <td>Cron job running</td>
                        <td>
                          <div className="progress progress-xs progress-striped active">
                            <div className="progress-bar bg-primary" style={{ width: '30%' }} />
                          </div>
                        </td>
                        <td><span className="badge bg-primary">30%</span></td>
                      </tr>
                      <tr>
                        <td>4.</td>
                        <td>Fix and squish bugs</td>
                        <td>
                          <div className="progress progress-xs progress-striped active">
                            <div className="progress-bar bg-success" style={{ width: '90%' }} />
                          </div>
                        </td>
                        <td><span className="badge bg-success">90%</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Striped Full Width Table</h3>
                </div>
                <div className="card-body p-0">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th style={{ width: 10 }}>#</th>
                        <th>Task</th>
                        <th>Progress</th>
                        <th style={{ width: 40 }}>Label</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1.</td>
                        <td>Update software</td>
                        <td>
                          <div className="progress progress-xs">
                            <div className="progress-bar progress-bar-danger" style={{ width: '55%' }} />
                          </div>
                        </td>
                        <td><span className="badge bg-danger">55%</span></td>
                      </tr>
                      <tr>
                        <td>2.</td>
                        <td>Clean database</td>
                        <td>
                          <div className="progress progress-xs">
                            <div className="progress-bar bg-warning" style={{ width: '70%' }} />
                          </div>
                        </td>
                        <td><span className="badge bg-warning">70%</span></td>
                      </tr>
                      <tr>
                        <td>3.</td>
                        <td>Cron job running</td>
                        <td>
                          <div className="progress progress-xs progress-striped active">
                            <div className="progress-bar bg-primary" style={{ width: '30%' }} />
                          </div>
                        </td>
                        <td><span className="badge bg-primary">30%</span></td>
                      </tr>
                      <tr>
                        <td>4.</td>
                        <td>Fix and squish bugs</td>
                        <td>
                          <div className="progress progress-xs progress-striped active">
                            <div className="progress-bar bg-success" style={{ width: '90%' }} />
                          </div>
                        </td>
                        <td><span className="badge bg-success">90%</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div> */}


          </div>
        </div>
      </div>


      <Footer />
    </div>
  )
}

export default home
