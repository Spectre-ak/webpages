Date: 8th Sep 2022

Contributor: @Akash Upadhyay

Mentors: @Paula Popa & @Lia Domide


Project Description
The Virtual Brain (TVB) is a brain stimulation platform. It offers tools for computing, simulating and analyzing functional and structural data of human brains. TVB provides a graphical user interface (GUI) for using its tools for studying human brains. The platform supports importing data into TVB like projects, data structures etc. Since TVB provides various tools for studying human brains the platform is also accessible through REST APIs. Goal of this project is to create a new package which will consume TVB REST services and perform operations on it. The new python client will have features like uploading data into a TVB, data encryption and validation, build BIDS datasets, monitor directories etc. Users will be able to use this python client to interact with a remote TVB server without using an active GUI.

Milestone 1 - Update BIDS Importer
In this phase we started working on updating the BIDS Importer. BIDS importer is used to import bids datasets into TVB projects. Goal was to modify the bids importer so that it will also support bids datasets with only single datatype (ts, net, coords, spatial). We're able to achieve this and we also tested the updated bids importer with BIDS datasets containing only time series or connectivity datatypes.

To use this custom bids importer, you can refer to the sample code which is also added here: View File/Commit

Milestone 2 - Creating BIDS data builder
In the second phase the goal was to build a module which can create datasets from a BIDS directory. The need was to design a builder which will create datasets with only required files and no other files. This will also reduce the size of the datasets.

Few challenges we faced

How do we find all the dependencies from json files? There are cases when a json file contains a path to another json file and so on.
So we came up with an approach similar to BFS traversal, since the connection(of dependencies paths) among json files was forming a graph-like structure. View get_connected_dependencies_paths
Finding a way to write files into a zip file with all the directories/sub-directories being preserved.
To resolve this we used ZipFile which is already in use in TVB importers. View create_archive
Final Outcome: A class named BIDSDataBuilder which takes BIDS root directory and datatype of which dataset is to be built. BIDSDataBuilder can also build a dataset from a set of initial json files. And the result is a zip file containing the built dataset.

View BIDSDataBuilder

Milestone 3 - Creating BIDS Directory monitor
After building BIDSDataBuilder our next goal was to write a separate module for observing or monitoring a BIDS directory for new files and whenever new files are added then consume BIDSDataBuilder to build a dataset for those files and import them into the TVB project.

So we splitted this this module into two parts

Watcher - Responsible for monitoring the directories and triggering uploader on new files
Uploader - Responsible for building the dataset for new files and importing the dataset into TVB project
Challenges:

Which library to be used for monitoring directory
We used watchdog npm library for monitoring directories and we configured it to detect json files changes only.
Running background processes
We needed the watcher to run in the background and not block other processes and similarly we needed the uploader to also run in the background. To resolve this we created two parallel threads namely watcher_thread and uploader_thread.
Final Outcome: BIDSDirWatcher class which takes BIDS directory as argument and monitors that directory for new files. It also takes additional arguments such as tvb project id in which data will be imported.

Milestone 4 - Testing
Now that we have BIDSDirWatcher and BIDSDataBuilder as a next step we need to test the module properly. During this phase we also added unit tests for bids data builder and dir watcher.

TestBIDSDataBuilder
TestBIDSDirWatcher
Challenges

While testing BIDSDirWatcher we found a bug in the BIDSImporter and because of this the import was not successful. The BIDSImporter was not able to extract the subject folders from the file paths present in a bids zip file. To resolve this we splitted the path in different manner and checked again if it's a subject directory.
Final Outcome: By this part we have our BIDSDirWatcher and BIDSDataBuilder ready and tested. Also added a sample file launch_bids_monitor.py for demonstrating how to consume the module. This file can also be used to run BIDSDirWatcher on a directory by passing it as command line arguments.

Milestone 5 - Packaging the code
This is the last stage of the project which includes packaging the whole code with all dependencies so that it can be installed easily.

So added following things

setup_bids_monitor.py
MANIFEST
README Readme
PRs and code repositories
Pull Request: (GSoC 2022, 8.2) TVB BIDS data builder and dir monitor module #589
TVB main repo: the-virtual-brain/tvb-root
Forked repo: Spectre-ak/tvb-root, tvb-bids-monitoring-gsoc
Code documentation: README.md
Project page: Separate tool to upload data into TVB
GSoC INCF page: INCF
GSoC home page: summerofcode.withgoogle.com
