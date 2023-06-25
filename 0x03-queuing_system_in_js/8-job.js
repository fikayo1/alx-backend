function createPushNotificationsJobs(jobs, queue) {
    if (!Array.isArray(jobs)) {
      throw new Error('Jobs is not an array');
    }
  
    jobs.forEach(job => {
      const jobId = job.id;
      const jobData = { jobId };
  
      const notificationJob = queue.create('push_notification_code_3', jobData)
        .save(err => {
          if (err) {
            console.error(`Notification job ${jobId} failed to create: ${err}`);
          } else {
            console.log(`Notification job created: ${jobId}`);
          }
        });
  
      notificationJob.on('complete', () => {
        console.log(`Notification job ${jobId} completed`);
      });
  
      notificationJob.on('failed', err => {
        console.error(`Notification job ${jobId} failed: ${err}`);
      });
  
      notificationJob.on('progress', (progress, data) => {
        console.log(`Notification job ${jobId} ${progress}% complete`);
      });
    });
  }
  